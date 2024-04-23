import Recruiter from "../Entities/Recruiter.js";

async function getRecruiters(){
    return await Recruiter.findAll();
}

async function getRecruiterById(id){
    let recruiter = await Recruiter.findByPk(id); 
    if (!recruiter) throw new Error('Recruiter not found');
    return recruiter;
}

async function createRecruiter(recruiterData){
    try {
        console.log('Received data', recruiterData);
        const recruiter = await Recruiter.create(recruiterData);
        console.log('Recruiter created', recruiter);
        return recruiter;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateRecruiter(idRecruiter, recruiterData){
    try {
        let recruiter = await Recruiter.findByPk(idRecruiter);
        if (!recruiter) throw new Error('Recruiter not found');

        recruiter = await Recruiter.update(recruiterData);
        console.log('Recruiter updated', recruiter);
        return recruiter;
    } catch (error) {
        throw error;
    }
}

async function upsertRecruiter(recruiterData){
    try {
        const [recruiter, created] = await Recruiter.upsert(recruiterData, {
            returning: true
        });
        console.log(created ? 'Recruiter created' : 'Recruiter updated', recruiter);
        return recruiter;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { getRecruiters, getRecruiterById, createRecruiter, updateRecruiter, upsertRecruiter };