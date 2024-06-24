import Job from '../Entities/Job.js';
import Student from '../Entities/Student.js';
import SavedJob from '../Entities/SavedJob.js';
import  {DB_SAVED_JOBS_JOBS, DB_SAVED_JOBS_STUDENT_ID} from '../Entities/dbConst.js';
import {getJobIdsByRecruiter} from '../DataAcces/jobDA.js'
import Sequelize from 'sequelize';

async function getSavedJobsByUserId(studentId) {
    return await Student.findOne({ 
        where: { studentId: studentId },
        include: [{ model: Job, as: DB_SAVED_JOBS_JOBS }]
      });
}

async function createSavedJob(savedJobData) {
    return await SavedJob.create(savedJobData);
}

async function deleteSavedJob(studentId, jobId) {
    return await SavedJob.destroy({ where: { studentId, jobId } });
}

async function getTopJobsBySaves(recruiterId) {
    try {
        const jobs = await Job.findAll({
            attributes: ['jobId', 'jobTitle', [Sequelize.fn('COUNT', Sequelize.col('saved_jobs_student->SavedJob.studentId')), 'savedJobCount']],
            include: [{
                model: Student,
                through: SavedJob,
                as: DB_SAVED_JOBS_STUDENT_ID,
                attributes: [] 
            }],
            group: ['jobId'], 
        });

        
        const recruiterJobIds = await getJobIdsByRecruiter(recruiterId);
        console.log("iddddd")
        console.log(recruiterJobIds)

        const filteredJobs = jobs.filter(job => recruiterJobIds.includes(job.jobId));
        const sortedJobs = filteredJobs.sort((a, b) => b.savedJobCount - a.savedJobCount);
        const topJobs = sortedJobs.slice(0, 5);

  
        topJobs.forEach(job => {
          const plainJob = job.get({ plain: true }); 
          console.log(plainJob);
        });
  
        return topJobs;
    } catch (err) {
        console.error('Error fetching jobs:', err);
    }
  }

  async function getSavedJobsCountByJobId(recruiterId) {
    try {

        const jobs = await Job.findAll({
            attributes: ['jobId', 'jobTitle', [Sequelize.fn('COUNT', Sequelize.col('saved_jobs_student->SavedJob.studentId')), 'savedJobCount']],
            include: [{
                model: Student,
                through: SavedJob,
                as: DB_SAVED_JOBS_STUDENT_ID,
                attributes: [] 
            }],
            group: ['jobId'], 
        });

        const recruiterJobIds = await getJobIdsByRecruiter(recruiterId);
        console.log("iddddd")
        console.log(recruiterJobIds)

        const filteredJobs = jobs.filter(job => recruiterJobIds.includes(job.jobId));
        let totalSavedJobs=0;

        filteredJobs.forEach(job => {
            const plainJob = job.get({ plain: true });
            totalSavedJobs += Number(plainJob.savedJobCount);
            console.log(plainJob.savedJobCount);
        });
        console.log(totalSavedJobs);
        return totalSavedJobs;

        } catch (err) {
            console.error('Error fetching job:', err);
        }
}

async function getSavedJobsCountByStudentId(studentId) {
    try {
        const count = await SavedJob.count({ where: { studentId: studentId } });
        return count;
    } catch (err) {
        console.error('Error fetching saved jobs count:', err);
    }
}

export { getSavedJobsByUserId, createSavedJob, deleteSavedJob, getTopJobsBySaves, getSavedJobsCountByJobId, getSavedJobsCountByStudentId };