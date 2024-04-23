import Job from '../Entities/Job.js';
import Student from '../Entities/Student.js';
import SavedJob from '../Entities/SavedJob.js';
import  {DB_SAVED_JOBS_JOBS} from '../Entities/dbConst.js';

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

export { getSavedJobsByUserId, createSavedJob, deleteSavedJob };