import express from 'express';
import multer from 'multer';
import { createWorker } from 'tesseract.js';
import * as pdfLib from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import os from 'os';

import {
    getStudentById,
    getStudents,
    createStudent,
    updateStudent,
    upsertStudent,
    countStudents
} from '../DataAcces/studentDA.js';

import { getEducationsByStudentId } from '../DataAcces/educationDA.js';
import { getExperiencesByStudentId } from '../DataAcces/experienceDA.js';
import { getLanguagesByStudentId } from '../DataAcces/languageDA.js';
import { getUserById } from '../DataAcces/userDA.js';

const studentRouter = express.Router();

studentRouter.route('/students').get(async (req, res) => {
    try {
        return res.json(await getStudents());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/student/:id').get(async (req, res) => {
    try {
        return res.json(await getStudentById(req.params.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/student').post(async (req, res) => {
    try {
        return res.json(await createStudent(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/student/update/:id').put(async (req, res) => {
    try {
        return res.json(await updateStudent(req.params.id, req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/student/upsert').post(async (req, res) => {
    try {
        return res.json(await upsertStudent(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/students/count').get(async (req, res) => {
    try {
        const count = await countStudents();
        return res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/student/generate-cv/:studentId').get(async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await getStudentById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const educations = await getEducationsByStudentId('studentId',studentId);
        const experiences= await getExperiencesByStudentId('studentId',studentId);
        const languages= await getLanguagesByStudentId('studentId',studentId);
        const userDetails= await getUserById(studentId)

        const pdfDoc = await pdfLib.PDFDocument.create();
        const page = pdfDoc.addPage();
    
        const { width, height } = page.getSize();
        const fontSize = 12;
        const fontSizeName=25;
        const fontSizeSubtitle=20
        const colorTitle = pdfLib.rgb(127 / 255, 39 / 255, 255 / 255);
        const colorHighlights=pdfLib.rgb(174/255, 133/255, 255/255);
        const colorSubtitle=pdfLib.rgb(199/255, 239/255, 0/255);
    
        page.drawText(`${student.firstName} ${student.lastName}`, { x: 50, y: height - 50, size: fontSizeName, color:colorTitle});
        const textTitle = `${student.firstName} ${student.lastName}`;
        const textTitleWidth = textTitle.length *12.5;
        page.drawText(textTitle, { x: 50, y: height - 50, size: fontSizeName, color:colorTitle});
        page.drawLine({
            start: { x: 50, y: height - 55 },
            end: { x: 50 + textTitleWidth, y: height - 55 },
            thickness: 3,
            color: colorTitle,
        });

        page.drawText(`Email: ${userDetails.email}`, { x: 50, y: height - 75, size: fontSize });
        page.drawText(`Phone: ${student.phoneNumber}`, { x: 50, y: height - 95, size: fontSize });
        page.drawText(`Location: ${student.placeToWork}`, { x: 50, y: height - 115, size: fontSize});
        let y=height-155;
        const aboutStudentText = `About: ${student.aboutStudent}`;
        const maxLineWidth = width - 100; 
        const estimatedCharactersPerLine = maxLineWidth / fontSize; 
        const words = aboutStudentText.split(' ');
        let line = '';
        let lines = [];

        for (const word of words) {
            if ((line + word).length > estimatedCharactersPerLine) {
                lines.push(line);
                line = word;
            } else {
                line += ' ' + word;
            }
        }

        // Push the last line if it's not empty
        if (line) {
            lines.push(line);
        }

        for (let i = 0; i < lines.length; i++) {
            const textToDraw = lines[i];
            page.drawText(textToDraw, { x: 50, y:height-135-(i*20), size: fontSize });
        }

        y -= 20 + ((lines.length-1) * 20);
        
        const textEducationSubtitle = `Education`;
        const textEducationSubtitleWidth = textEducationSubtitle.length *11;
        page.drawText(textEducationSubtitle, { x: 50, y: y, size: fontSizeSubtitle, color:colorSubtitle});
        page.drawLine({
            start: { x: 50, y: y - 5 },
            end: { x: 50 + textEducationSubtitleWidth, y: y - 5 },
            thickness: 3,
            color: colorSubtitle,
        });

        for (const education of educations) {
        const startYear = education.startYear.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const endYear = education.endYear.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            page.drawText(`${education.institutionName}`, { x: 50, y:y-25, size: 15, color:colorHighlights });
            page.drawText(`${startYear} - ${endYear}`, { x: 50, y:y-45, size: fontSize });
            page.drawText(`Field of study: ${education.fieldOfStudy}`, { x: 50, y:y-65, size: fontSize });
            page.drawText(`Degree: ${education.degreeType}`, { x: 50, y:y-85, size: fontSize });
            y -= 100;
        }
        y-=30;
        const textExperienceSubtitle = `Experience`;
        const textExperienceSubtitleWidth = textExperienceSubtitle.length *11-5;
        page.drawText(textExperienceSubtitle, { x: 50, y: y, size: fontSizeSubtitle, color:colorSubtitle});
        page.drawLine({
            start: { x: 50, y: y - 5 },
            end: { x: 50 + textExperienceSubtitleWidth, y: y - 5 },
            thickness: 3,
            color: colorSubtitle,
        });

        y-=25;
        for (const experience of experiences) {

            const startYear = experience.startYear.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const endYear = experience.endYear.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            page.drawText(`${experience.positionTitle} - ${experience.companyName}`, { x: 50, y:y, size: 15, color:colorHighlights });
            page.drawText(`${startYear} - ${endYear}`, { x: 50, y:y-20, size: fontSize });
            const aboutExperienceText = `${experience.experienceDescription}`;
            const maxLineWidth = width - 100; 
            const estimatedCharactersPerLine = maxLineWidth / 5; 
            const words = aboutExperienceText.split(' ');
            let line = '';
            let lines = [];

            for (const word of words) {
                if ((line + word).length > estimatedCharactersPerLine) {
                    lines.push(line);
                    line = word;
                } else {
                    line += ' ' + word;
                }
            }

            if (line) {
                lines.push(line);
            }

            for (let i = 0; i < lines.length; i++) {
                const textToDraw = lines[i];
                page.drawText(textToDraw, { x: 50, y:y-40-(i*20), size: fontSize });
            }

            y -= 70 + ((lines.length-1) * 20);
        }
        
        const textLanguage = `Languages`;
        const textLanguageWidth = textLanguage.length *11;
        page.drawText(textLanguage, { x: 50, y: y, size: fontSizeSubtitle, color:colorSubtitle});
        page.drawLine({
            start: { x: 50, y: y - 5 },
            end: { x: 50 + textLanguageWidth, y: y - 5 },
            thickness: 3,
            color: colorSubtitle,
        });
        y-=25;
        for (const language of languages) {
            page.drawText(`Language: ${language.languageName}, Level: ${language.proficiencyLevel}`, { x: 50, y, size: fontSize });
            y -= 20;
        }

        const pdfBytes = await pdfDoc.save();

        const desktopDir = path.join(os.homedir(), 'OneDrive', 'Desktop');
        const pdfPath = path.join(desktopDir, `${student.firstName}-${student.lastName}-CV.pdf`);
        if (!fs.existsSync(desktopDir)) {
        fs.mkdirSync(desktopDir);
        }

        fs.writeFileSync(pdfPath, pdfBytes);
    
        res.download(pdfPath, 'student-cv.pdf', (err) => {
          if (err) {
            console.error('Error downloading PDF:', err);
            res.status(500).json({ error: 'Error downloading PDF' });
          }
        });

    } catch (error) {
        console.error('Error when creating the pdf:', error);
        return res.status(500).json({ error: 'Database error' });
    }
});


export default studentRouter;