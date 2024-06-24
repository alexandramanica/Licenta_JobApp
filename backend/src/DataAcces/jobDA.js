import Job from "../Entities/Job.js";
import Sequelize from 'sequelize';

async function getJobs(){
    return await Job.findAll();
}

async function getJobById(id){
    let job = await Job.findByPk(id); 
    if (!job) throw new Error('Job not found');
    return job;
}

async function getJobsByRecruiterId(recruiterId){
    return await Job.findAll({
        where: {
            recruiterId: recruiterId
        }
    });
}

async function getJobsByPostedDate(recruiterId){
    return await Job.findAll({
        where: {
            recruiterId: recruiterId
        },
        order: [
            ['jobDate', 'DESC']
        ],
        limit: 3
    });
}

async function getAllJobsByPostedDateLimit(){
    console.log("hei postdate")
    return await Job.findAll({
        order: [
            ['jobDate', 'DESC']
        ],
        limit: 3
    });
}

async function createJob(jobData){
    try {
        console.log('Received data', jobData);
        const job = await Job.create(jobData);
        console.log('Job created', job);
        return job;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateJob(idJob, jobData){
    try {
        let job = await Job.findByPk(idJob);
        if (!job) throw new Error('Job not found');

        job = await Job.update(jobData, { where: { jobId: idJob } });
        console.log('Job updated', job);
        return job;
    } catch (error) {
        throw error;
    }
}

async function upsertJob(jobData){
    try {
        const [job, created] = await Job.upsert(jobData, {
            returning: true
        });
        console.log(created ? 'Job created' : 'Job updated', job);
        return job;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function countJobsByRecruiterId(recruiterId){
    return await Job.count({
        where: {
            recruiterId: recruiterId
        }
    });
}

async function deleteJob(id) {
    try {
    
      const job = await Job.findByPk(id);
      if (!job) throw new Error('Job not found');
  
      await job.destroy();
      console.log('Job deleted');
    } catch (error) {
      console.log(error);
      throw error;
    }
}

async function getJobIdsByRecruiter(recruiterId) {
    try {
        const jobs = await Job.findAll({
            attributes: ['jobId'],
            where: { recruiterId: recruiterId }
        });
        const jobIds = jobs.map(job => job.jobId);
        return jobIds;
    } catch (err) {
        console.error('Error fetching job IDs:', err);
        throw err; 
    }
}

async function countJobsByPath() {
    try {
        const jobs = await Job.findAll({
            attributes: ['jobPath', [Sequelize.fn('COUNT', 'jobPath'), 'jobCount']],
            group: ['jobPath'],
            raw: true,
        });

        return jobs;
    } catch (err) {
        console.error('Error fetching job counts:', err);
        throw err; 
    }
}

async function countAllJobs() {
    try {
        const count = await Job.count();
        return count;
    } catch (err) {
        console.error('Error fetching job count:', err);
    }
}


export { getJobs, getJobById, createJob, updateJob, upsertJob, getJobsByRecruiterId, deleteJob, getJobsByPostedDate, countJobsByRecruiterId, getJobIdsByRecruiter, getAllJobsByPostedDateLimit, countJobsByPath, countAllJobs};