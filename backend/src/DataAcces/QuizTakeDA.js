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

export { getQuizTakes, getQuizTakeById, createQuizTake, upsertQuizTake, getQuizTakeByStudentId };

