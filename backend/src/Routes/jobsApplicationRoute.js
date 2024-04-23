import express from 'express';
import { getJobsApplicationByUserId, createJobsApplication, getStudentsByJobId, getTopJobsByApplicants } from '../DataAcces/jobsApplicationDA.js';

const jobApplicationRouter = express.Router();

jobApplicationRouter.get('/jobsApplication/:studentId', async (req, res) => {
    try {
        const jobsApplication = await getJobsApplicationByUserId(req.params.studentId);
        res.json(jobsApplication);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

jobApplicationRouter.post('/jobsApplication', async (req, res) => {
    try {
        const newJobsApplication = await createJobsApplication(req.body);
        res.json(newJobsApplication);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

jobApplicationRouter.get('/jobApplication/studentsByJob/:jobId', async (req, res) => {
    try {
        const students = await getStudentsByJobId(req.params.jobId);
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

jobApplicationRouter.get('/jobsApplication/top', async (req, res) => {
    try {
        console.log('top');
        // const topJobs = await getTopJobsByApplicants();
        // res.json(topJobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default jobApplicationRouter;