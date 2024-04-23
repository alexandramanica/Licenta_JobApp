import Language from "../Entities/Language.js";

async function getLanguages(){
    return await Language.findAll();
}

async function getLanguageById(id){
    let language = await Language.findByPk(id); 
    if (!language) throw new Error('Language not found');
    return language;
}

async function createLanguage(languageData){
    try {
        console.log('Received data', languageData);
        const languages = await Promise.all(languageData.map(async (data) => {
            const language = await Language.create(data);
            console.log('Language created', language);
            return language;
        }));
        return languages;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateLanguage(idLanguage, languageData){
    try {
        let language = await Language.findByPk(idLanguage);
        if (!language) throw new Error('Language not found');

        language = await language.update(languageData);
        console.log('Language updated', language);
        return language;
    } catch (error) {
        throw error;
    }
}

async function upsertLanguage(languageData){
    try {
        const [language, created] = await Language.upsert(languageData, {
            returning: true
        });
        console.log(created ? 'Language created' : 'Language updated', language);
        return language;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getLanguagesByStudentId(studentId, value){
    return await Language.findAll({
        where: {
            [studentId]: value
        }
    });
}

async function deleteLanguage(id) {
    try {
    
      const language = await Language.findByPk(id);
      if (!language) throw new Error('Language not found');
  
      await language.destroy();
      console.log('Language deleted');
    } catch (error) {
      console.log(error);
      throw error;
    }
}

export { getLanguages, getLanguageById, createLanguage, updateLanguage, upsertLanguage, getLanguagesByStudentId, deleteLanguage };