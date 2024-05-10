import QuizTake from "../Entities/QuizTake.js";

async function getQuizTakes(){
    return await QuizTake.findAll();
}

async function getQuizTakeById(id){
    let quizTake = await QuizTake.findByPk(id); 
    if (!quizTake) throw new Error('quizTake not found');
    return quizTake;
}

async function createQuizTake(quizData){
    try {
        console.log('Received data', quizData);
        const quiz = await QuizTake.create(quizData);
        console.log('Recruiter created', quiz);
        return quiz;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function upsertQuizTake(quizData){
    try {
        let quizTake = await QuizTake.findOne({ where: { studentId: quizData.studentId } });

        if (quizTake) {
            
            console.log('QuizTake updated', quizTake);
            return await quizTake.update(quizData);
        } else {
            
            quizTake = await QuizTake.create(quizData);
            console.log('QuizTake created', quizTake);
            return quizTake;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getQuizTakeByStudentId(studentId){
    try {
        let quizTake = await QuizTake.findOne({ where: { studentId: studentId } });
        if (!quizTake) throw new Error('QuizTake not found');
        return quizTake;
    } catch (error) {
        console.error('Error getting quiz take by student ID:', error);
        throw error;
    }
}


async function countQuizTakes(){
    try{
        return await QuizTake.count();}
    catch{
        throw new Error('Error counting quiz takes');
    }   
}

async function countStudentsByPath() {
    try {
        const totalQuizTakes = await QuizTake.count();
        if (totalQuizTakes === 0) throw new Error('No quiz takes found');

        const maxEngineeringPoints = await QuizTake.max('EngineeringPath');
        const maxDataPoints = await QuizTake.max('DataPath');

        const engineeringCount = await QuizTake.count({
            where: { EngineeringPath: maxEngineeringPoints }
        });

        const dataCount = await QuizTake.count({
            where: { DataPath: maxDataPoints }
        });

        return { engineeringCount, dataCount };
    } catch (error) {
        console.error('Error counting students by path:', error);
        throw error;
    }
}

export { getQuizTakes, getQuizTakeById, createQuizTake, upsertQuizTake, getQuizTakeByStudentId, countQuizTakes, countStudentsByPath };

