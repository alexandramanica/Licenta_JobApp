import Education from "../Entities/Education.js";
import  pick  from "lodash";

async function getEducations(){
    return await Education.findAll();
}

async function getEducationById(id){
    let education = await Education.findByPk(id); 
    if (!education) throw new Error('education not found');
    return education;
}

async function createEducation(educationData){
    try {
        console.log('Received data', educationData);
        const educations = await Promise.all(educationData.map(async (data) => {
            const education = await Education.create(data);
            console.log('education created', education);
            return education;
        }));
        return educations;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateEducation(idEducation, educationData){
    try {
        let education = await Education.findByPk(idEducation);
        if (!education) throw new Error('education not found');

        education = await education.update(educationData);
        console.log('education updated', education);
        return education;
    } catch (error) {
        throw error;
    }
}

async function upsertEducation(educationData){
    try {
        const [education, created] = await Education.upsert(educationData, {
            returning: true
        });
        console.log(created ? 'education created' : 'education updated', education);
        return education;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getEducationsByStudentId(studentId, value){
    return await Education.findAll({
        where: {
            [studentId]: value
        }
    });
}

async function deleteEducation(id) {
    try {
    
      const education = await Education.findByPk(id);
      if (!education) throw new Error('Education not found');
  
      await education.destroy();
      console.log('Education deleted');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

export { getEducations, getEducationById, createEducation, updateEducation,upsertEducation,getEducationsByStudentId,deleteEducation};
        
    