import express from 'express';
import {
    getStudentById,
    getStudents,
    createStudent,
    updateStudent,
    upsertStudent
} from '../DataAcces/studentDA.js';

const studentRouter = express.Router();

studentRouter.route('/students').get(async (req, res) => {
    try {
        return res.json(await getStudents());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/student/:id').get(async (req, res) => {
    try {
        return res.json(await getStudentById(req.params.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/student').post(async (req, res) => {
    try {
        return res.json(await createStudent(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/student/update/:id').put(async (req, res) => {
    try {
        return res.json(await updateStudent(req.params.id, req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

studentRouter.route('/student/upsert').post(async (req, res) => {
    try {
        return res.json(await upsertStudent(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default studentRouter;