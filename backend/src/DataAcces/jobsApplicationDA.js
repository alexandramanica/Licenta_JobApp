import JobApplication from '../Entities/JobApplication.js';
import Job from '../Entities/Job.js';
import Student from '../Entities/Student.js';
import Sequelize from 'sequelize';
import { Op } from "sequelize";
import {DB_APPLIED_JOB_STUDENT_ID, DB_APPLIED_JOBS_JOBS_ID} from '../Entities/dbConst.js';


async function getJobsApplicationByUserId(studentId) {
    return await Student.findOne({ 
        where: { studentId: studentId },
        include: [{ model: Job, as: DB_APPLIED_JOB_STUDENT_ID }]
    });
}

async function getStudentsByJobId(jobId) {
    const jobApplications = await JobApplication.findAll({ where: { jobId: jobId } });
    const studentIds = jobApplications.map(jobApplication => jobApplication.studentId);
    return await Student.findAll({ where: { studentId: studentIds } });
}

async function createJobsApplication(jobsApplicationData) {
    return await JobApplication.create(jobsApplicationData);
}

async function getTopJobsByApplicants() {
    Job.findAll({
        attributes: ['id', 'jobTitle', [sequelize.fn('COUNT', sequelize.col('Students.id')), 'applicantCount']],
        include: [{
          model: Student,
          through: JobApplication,
          as: DB_APPLIED_JOBS_JOBS_ID,
          attributes: [] // To exclude student attributes
        }],
        group: ['Job.id', 'jobTitle'], // Group by Job.id and jobTitle
      })
      .then(jobs => {
        jobs.forEach(job => {
          console.log(`Job ${job.jobTitle} has ${job.getDataValue('applicantCount')} applicants.`);
        });
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
      });
}

export { getJobsApplicationByUserId, createJobsApplication, getStudentsByJobId, getTopJobsByApplicants };