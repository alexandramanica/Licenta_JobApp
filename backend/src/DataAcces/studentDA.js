import Student from "../Entities/Student.js";
import Experience from '../Entities/Experience.js'
import Education from '../Entities/Education.js'
import Language from '../Entities/Language.js'
import { getEducationsByStudentId } from "./educationDA.js";
import { getExperiencesByStudentId } from "./experienceDA.js";
import { getLanguagesByStudentId } from "./languageDA.js";
import  pick  from "lodash";
import axios from "axios";

async function getStudents(){
    return await Student.findAll();
}

async function getStudentById(id){
    let student = await Student.findByPk(id); 
    if (!student) throw new Error('student not found');
    return student;
}

async function createStudent(studentData){
    try {
        console.log('Received data', studentData);
        const student= await Student.create(studentData);
        console.log('student created', student);
        return student;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateStudent(idstudent, studentData){
    try {
        let student = await Student.findByPk(idstudent);
        if (!student) throw new Error('student not found');

        student = await Student.update(studentData);
        console.log('student updated', student);
        return student;
    } catch (error) {
        throw error;
    }
}

async function upsertStudent(studentData){
    try {
        const [student, created] = await Student.upsert(studentData, {
            returning: true
        });
        console.log(created ? 'student created' : 'student updated', student);
        return student;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function countStudents(){
    return await Student.count();
}

async function getStudentData(id) {
    try {
        let student = await getStudentById(id);
        if (!student) throw new Error('student not found');

        const experiences = await getExperiencesByStudentId('studentId',id);
        const educations = await getEducationsByStudentId('studentId',id); // Corectat
        const languages = await getLanguagesByStudentId('studentId',id); // Corectat

        const studentData = student.toJSON();
        studentData.experiences = experiences;
        studentData.languages = languages;
        studentData.educations = educations;
        
        return studentData;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllStudentsData() {
    try {
        // Obține toți studenții
        const students = await getStudents();

        // Iterează prin fiecare student și obține datele asociate
            const allStudentsData = await Promise.all(students.map(async (student) => {
            const studentId = student.studentId;

            const experiences = await getExperiencesByStudentId('studentId', studentId);
            const educations = await getEducationsByStudentId('studentId', studentId);
            const languages = await getLanguagesByStudentId('studentId', studentId);

            const studentData = student.toJSON();
            studentData.experiences = experiences;
            studentData.languages = languages;
            studentData.educations = educations;

            return studentData;
        }));

        return allStudentsData;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function sendStudentDataToChatGPT(studentData) {
    const apiKey = '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'; 

    const prompt = `
    Here are the details of a student. Please analyze the CV and provide feedback and advices, written in the first person.

    Student Information:
    Name: ${studentData.firstName} ${studentData.lastName}
    About: ${studentData.aboutStudent}
    Place to Work: ${studentData.placeToWork}
    Phone Number: ${studentData.phoneNumber}

    Experiences:
    ${studentData.experiences.map(exp => `
        Company: ${exp.companyName}
        Position: ${exp.positionTitle}
        Description: ${exp.experienceDescription}
        Start Year: ${new Date(exp.startYear).toISOString()}
        End Year: ${new Date(exp.endYear).toISOString()}
    `).join('\n')}

    Languages:
    ${studentData.languages.map(lang => `
        Language: ${lang.languageName}
        Proficiency: ${lang.proficiencyLevel}
    `).join('\n')}

    Educations:
    ${studentData.educations.map(edu => `
        Institution: ${edu.institutionName}
        Degree: ${edu.degreeType}
        Field of Study: ${edu.fieldOfStudy}
        Start Year: ${new Date(edu.startYear).toISOString()}
        End Year: ${new Date(edu.endYear).toISOString()}
    `).join('\n')}
    `;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', 
            messages: [
                { role: 'system', content: 'You are a helpful assistant that analyzes student CVs.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 1500, 
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error sending data to ChatGPT:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function recommendTopStudentsToApi(criteria) {
    try {
        const apiKey = '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'; 
        const allStudentsData = await getAllStudentsData();

        const prompt = `
        Here is a list of students with their details. Based on the following criteria, recommend the top 5 students and explain your choices.

        Criteria:
        ${criteria}

        Students:
        ${allStudentsData.map(student => `
            Name: ${student.firstName} ${student.lastName}
            About: ${student.aboutStudent}
            Place to Work: ${student.placeToWork}
            Phone Number: ${student.phoneNumber}
            Experiences: ${student.experiences.map(exp => `
                Company: ${exp.companyName}
                Position: ${exp.positionTitle}
                Description: ${exp.experienceDescription}
                Start Year: ${new Date(exp.startYear).toISOString()}
                End Year: ${new Date(exp.endYear).toISOString()}
            `).join('\n')}
            Languages: ${student.languages.map(lang => `
                Language: ${lang.languageName}
                Proficiency: ${lang.proficiencyLevel}
            `).join('\n')}
            Educations: ${student.educations.map(edu => `
                Institution: ${edu.institutionName}
                Degree: ${edu.degreeType}
                Field of Study: ${edu.fieldOfStudy}
                Start Year: ${new Date(edu.startYear).toISOString()}
                End Year: ${new Date(edu.endYear).toISOString()}
            `).join('\n')}
        `).join('\n')}
        `;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',  
            messages: [
                { role: 'system', content: 'You are a helpful assistant that recommends top students based on given criteria.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 1500, 
        }, {
            headers: {
                'Authorization':  `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error sending data to ChatGPT:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export { getStudents, getStudentById, createStudent, updateStudent,upsertStudent,countStudents, getStudentData, sendStudentDataToChatGPT, getAllStudentsData, recommendTopStudentsToApi};
        
    