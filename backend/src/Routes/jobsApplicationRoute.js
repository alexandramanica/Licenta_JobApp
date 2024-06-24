import express from 'express';
import { getJobsApplicationByUserId, createJobsApplication, getStudentsByJobId, getTopJobsByApplicants, getApplicantCountByJobId, getApplicationsCountByStudentId} from '../DataAcces/jobsApplicationDA.js';

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

jobApplicationRouter.get('/jobApplication/top/:recruiterId', async (req, res) => {
    try {
        console.log('top');
        const topJobs = await getTopJobsByApplicants(req.params.recruiterId);
        res.json(topJobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

jobApplicationRouter.get('/jobApplication/count/:recruiterId', async (req, res) => {
    try {
        console.log('top');
        const countJobs = await getApplicantCountByJobId(req.params.recruiterId);
        res.json(countJobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

jobApplicationRouter.get('/jobsApplication/countByStudent/:studentId', async (req, res) => {
    try {
        const count = await getApplicationsCountByStudentId(req.params.studentId);
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
export default jobApplicationRouter;