import express from 'express';
import {
    getEducationById,
    getEducations,
    createEducation,
    updateEducation,
    upsertEducation,
    getEducationsByStudentId,
    deleteEducation
} from '../DataAcces/educationDA.js';

const educationRouter = express.Router();

educationRouter.route('/educations').get(async (req, res) => {
    try {
        return res.json(await getEducations());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

educationRouter.route('/educations/:id').get(async (req, res) => {
    try {
        return res.json(await getEducationById(req.params.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

educationRouter.route('/education').post(async (req, res) => {
    try {
        return res.json(await createEducation(req.body.educationData));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

educationRouter.route('/education/update/:id').put(async (req, res) => {
    try {
        return res.json(await updateEducation(req.params.id, req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

educationRouter.route('/education/upsert').post(async (req, res) => {
    try {
        return res.json(await upsertEducation(req.body.educationData));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

educationRouter.get('/education/studentId/:studentId', async (req, res) => {
    try {
      const educations = await getEducationsByStudentId('studentId', req.params.studentId);
      res.json(educations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

educationRouter.route('/education/delete/:id').delete(async (req, res) => {
    try {
        await deleteEducation(req.params.id);
        return res.json({ message: 'Education deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default educationRouter;