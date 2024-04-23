import express from 'express';
import {
    getRecruiterById,
    getRecruiters,
    createRecruiter,
    updateRecruiter,
    upsertRecruiter
} from '../DataAcces/recruiterDA.js';

const recruiterRouter = express.Router();

recruiterRouter.route('/recruiters').get(async (req, res) => {
    try {
        return res.json(await getRecruiters());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

recruiterRouter.route('/recruiter/:id').get(async (req, res) => {
    try {
        return res.json(await getRecruiterById(req.params.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

recruiterRouter.route('/recruiter').post(async (req, res) => {
    try {
        return res.json(await createRecruiter(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

recruiterRouter.route('/recruiter/update/:id').put(async (req, res) => {
    try {
        return res.json(await updateRecruiter(req.params.id, req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

recruiterRouter.route('/recruiter/upsert').post(async (req, res) => {
    try {
        return res.json(await upsertRecruiter(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default recruiterRouter;