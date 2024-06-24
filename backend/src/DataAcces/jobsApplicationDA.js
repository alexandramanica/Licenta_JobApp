import JobApplication from '../Entities/JobApplication.js';
import Job from '../Entities/Job.js';
import Student from '../Entities/Student.js';
import Sequelize from 'sequelize';
import { Op } from "sequelize";
import {DB_APPLIED_JOB_STUDENT_ID, DB_APPLIED_JOBS_JOBS_ID} from '../Entities/dbConst.js';
import {getJobIdsByRecruiter} from '../DataAcces/jobDA.js'

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


async function getTopJobsByApplicants(recruiterId) {
  try {
      const jobs = await Job.findAll({
          attributes: ['jobId', 'jobTitle', [Sequelize.fn('COUNT', Sequelize.col('applied_jobs_jobs->JobApplication.studentId')), 'applicantCount']],
          include: [{
              model: Student,
              through: JobApplication,
              as: DB_APPLIED_JOBS_JOBS_ID,
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

async function getApplicantCountByJobId(recruiterId) {
    try {
        const jobs = await Job.findAll({
            attributes: ['jobId', 'jobTitle', [Sequelize.fn('COUNT', Sequelize.col('applied_jobs_jobs->JobApplication.studentId')), 'applicantCount']],
            include: [{
                model: Student,
                through: JobApplication,
                as: DB_APPLIED_JOBS_JOBS_ID,
                attributes: [] 
            }],
            group: ['jobId'], 
        });

      const recruiterJobIds = await getJobIdsByRecruiter(recruiterId);
      console.log("iddddd")
      console.log(recruiterJobIds)

      const filteredJobs = jobs.filter(job => recruiterJobIds.includes(job.jobId));
      let totalApplicants=0;

      filteredJobs.forEach(job => {
        const plainJob = job.get({ plain: true });
        totalApplicants += Number(plainJob.applicantCount);
        console.log(plainJob.applicantCount);
      });
      console.log(totalApplicants);
      return totalApplicants;

    } catch (err) {
        console.error('Error fetching job:', err);
    }
}

async function getApplicationsCountByStudentId(studentId) {
    try {
        const count = await JobApplication.count({ where: { studentId: studentId } });
        return count;
    } catch (err) {
        console.error('Error fetching applications count:', err);
    }
}

export { getJobsApplicationByUserId, createJobsApplication, getStudentsByJobId, getTopJobsByApplicants, getApplicantCountByJobId, getApplicationsCountByStudentId};