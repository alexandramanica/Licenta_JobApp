import express from 'express';
import { getSavedJobsByUserId, createSavedJob, deleteSavedJob, getTopJobsBySaves, getSavedJobsCountByJobId, getSavedJobsCountByStudentId } from '../DataAcces/savedJobsDA.js';


const savedJobRouter = express.Router();

savedJobRouter.get('/savedJob/:studentId', async (req, res) => {
    try {
        const savedJobs = await getSavedJobsByUserId(req.params.studentId);
        res.json(savedJobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

savedJobRouter.post('/savedJob', async (req, res) => {
    try {
        const savedJob = await createSavedJob(req.body);
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

savedJobRouter.delete('/savedJob/:studentId/:jobId', async (req, res) => {
    try {
        console.log(`Deleting job for studentId: ${req.params.studentId}, jobId: ${req.params.jobId}`);
        await deleteSavedJob(req.params.studentId, req.params.jobId);
        res.json({ message: 'Job deleted' });
    } catch (err) {
        console.error(`Error deleting job: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
});

savedJobRouter.get('/savedJobRouter/top/:recruiterId', async (req, res) => {
    try {
        console.log('top');
        let recruiterId =req.params.recruiterId;
        const topJobs = await getTopJobsBySaves(recruiterId);
        res.json(topJobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

savedJobRouter.get('/savedJobRouter/count/:recruiterId', async (req, res) => {
    try {
        console.log('top');
        let recruiterId =req.params.recruiterId;
        const topJobs = await getSavedJobsCountByJobId(recruiterId);
        res.json(topJobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

savedJobRouter.get('/savedJob/countByStudent/:studentId', async (req, res) => {
    try {
        const count = await getSavedJobsCountByStudentId(req.params.studentId);
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default savedJobRouter;
