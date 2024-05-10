import express from 'express';
import {
    getQuizTakeById,
    getQuizTakeByStudentId,
    getQuizTakes,
    createQuizTake,
    upsertQuizTake,
    countQuizTakes,
    countStudentsByPath
} from '../DataAcces/QuizTakeDA.js';

const quizTakeRouter = express.Router();

quizTakeRouter.route('/quizTakes').get(async (req, res) => {
    try {
        return res.json(await getQuizTakes());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

quizTakeRouter.route('/quizTake/:id').get(async (req, res) => {
    try {
        return res.json(await getQuizTakeById(req.params.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

quizTakeRouter.route('/quizTake').post(async (req, res) => {
    try {
        return res.json(await createQuizTake(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

quizTakeRouter.route('/quizTake/upsert').post(async (req, res) => {
    try {
        console.log('Received data', req.body);
        return res.json(await upsertQuizTake(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

quizTakeRouter.route('/quizTake/student/:studentId').get(async (req, res) => {
    try {
        const quizTake = await getQuizTakeByStudentId(req.params.studentId);
        return res.json(quizTake);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


quizTakeRouter.route('/quizTake/counter').get(async (req, res) => {
    try {
        console.log("hahaha")
        const count = await countQuizTakes();
        console.log('Count:', count);
        return res.json({ count });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
});

quizTakeRouter.route('/quiztake/countByPath').get(async (req, res) => {
    try {
        const counts = await countStudentsByPath();
        return res.json(counts);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default quizTakeRouter;