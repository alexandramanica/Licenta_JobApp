import express from 'express';
import {
    getExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    upsertExperience,
    getExperiencesByStudentId,
    deleteExperience
} from '../DataAcces/experienceDA.js';

const experienceRouter = express.Router();

experienceRouter.route('/experiences').get(async (req, res) => {
    try {
        return res.json(await getExperiences());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

experienceRouter.route('/experiences/:id').get(async (req, res) => {
    try {
        return res.json(await getExperienceById(req.params.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

experienceRouter.route('/experience').post(async (req, res) => {
    try {
        return res.json(await createExperience(req.body.experienceData));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

experienceRouter.route('/experience/update/:id').put(async (req, res) => {
    try {
        return res.json(await updateExperience(req.params.id, req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

experienceRouter.route('/experience/upsert').post(async (req, res) => {
    try {
        return res.json(await upsertExperience(req.body.experienceData));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

experienceRouter.get('/experience/studentId/:studentId', async (req, res) => {
    try {
      const experiences = await getExperiencesByStudentId('studentId', req.params.studentId);
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

experienceRouter.route('/experience/delete/:id').delete(async (req, res) => {
    try {
        await deleteExperience(req.params.id);
        return res.json({ message: 'Experience deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default experienceRouter;