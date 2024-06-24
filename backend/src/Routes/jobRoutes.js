import express from 'express';
import {
    getJobById,
    getJobs,
    getJobsByRecruiterId,
    getJobsByPostedDate,
    createJob,
    updateJob,
    upsertJob,
    countJobsByRecruiterId,
    deleteJob,
    getAllJobsByPostedDateLimit,
    countJobsByPath,
    countAllJobs
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

jobRouter.get('/job/postingDate/:recruiterId', async (req, res) => {
    try {
      const jobs = await getJobsByPostedDate(req.params.recruiterId);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

jobRouter.get('/job/postingDate/all/:id', async (req, res) => {
    try {
        console.log("jobs")
      const jobs = await getAllJobsByPostedDateLimit();
      console.log(jobs)
      res.json(jobs);
      console.log(jobs)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

jobRouter.get('/job/count/:recruiterId', async (req, res) => {
    try {
      const count = await countJobsByRecruiterId(req.params.recruiterId);
      res.json({ count });
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

jobRouter.get('/job/countByPath/:id', async (req, res) => {
    try {
        console.log("hei")
        const counts = await countJobsByPath();
        res.json(counts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

jobRouter.get('/jobs/allCount', async (req, res) => {
    try {
        const count = await countAllJobs();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default jobRouter;