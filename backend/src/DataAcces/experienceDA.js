import Experience from "../Entities/Experience.js";

async function getExperiences(){
    return await Experience.findAll();
}

async function getExperienceById(id){
    let experience = await Experience.findByPk(id); 
    if (!experience) throw new Error('Experience not found');
    return experience;
}

async function createExperience(experienceData){
    try {
        console.log('Received data', experienceData);
        const experiences = await Promise.all(experienceData.map(async (data) => {
            const experience = await Experience.create(data);
            console.log('Experience created', experience);
            return experience;
        }));
        return experiences;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateExperience(idExperience, experienceData){
    try {
        let experience = await Experience.findByPk(idExperience);
        if (!experience) throw new Error('Experience not found');

        experience = await experience.update(experienceData);
        console.log('Experience updated', experience);
        return experience;
    } catch (error) {
        throw error;
    }
}

async function upsertExperience(experienceData){
    try {
        const [experience, created] = await Experience.upsert(experienceData, {
            returning: true
        });
        console.log(created ? 'Experience created' : 'Experience updated', experience);
        return experience;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getExperiencesByStudentId(studentId, value){
    return await Experience.findAll({
        where: {
            [studentId]: value
        }
    });
}

async function deleteExperience(id) {
    try {
    
      const experience = await Experience.findByPk(id);
      if (!experience) throw new Error('Experience not found');
  
      await experience.destroy();
      console.log('Experience deleted');
    } catch (error) {
      console.log(error);
      throw error;
    }
}

export { getExperiences, getExperienceById, createExperience, updateExperience, upsertExperience, getExperiencesByStudentId, deleteExperience };