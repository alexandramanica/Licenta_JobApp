import express from 'express';
import {
    getJobById,
    getJobs,
    getJobsByRecruiterId,
    createJob,
    updateJob,
    upsertJob,
    deleteJob
} from '../DataAcces/jobDA.js';

const jobRouter = express.Router();

jobRouter.route('/jobs').get(async (req, res) => {
    try {
        return res.json(await getJobs());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

jobRouter.route('/job/:id').get(async (req, res) => {
    try {
        return res.json(await getJobById(req.params.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

jobRouter.route('/job').post(async (req, res) => {
    try {
        return res.json(await createJob(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

jobRouter.route('/job/update/:id').put(async (req, res) => {
    try {
        return res.json(await updateJob(req.params.id, req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

jobRouter.route('/job/upsert').post(async (req, res) => {
    try {
        return res.json(await upsertJob(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

jobRouter.get('/job/recruiterId/:recruiterId', async (req, res) => {
    try {
      const jobs = await getJobsByRecruiterId(req.params.recruiterId);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

jobRouter.route('/job/delete/:id').delete(async (req, res) => {
    try {
        await deleteJob(req.params.id);
        return res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default jobRouter;