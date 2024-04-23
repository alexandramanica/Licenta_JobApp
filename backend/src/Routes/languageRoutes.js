import express from 'express';
import {
    getLanguages,
    getLanguageById,
    createLanguage,
    updateLanguage,
    upsertLanguage,
    getLanguagesByStudentId,
    deleteLanguage
} from '../DataAcces/languageDA.js';

const languageRouter = express.Router();

languageRouter.route('/languages').get(async (req, res) => {
    try {
        return res.json(await getLanguages());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

languageRouter.route('/languages/:id').get(async (req, res) => {
    try {
        return res.json(await getLanguageById(req.params.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

languageRouter.route('/language').post(async (req, res) => {
    try {
        return res.json(await createLanguage(req.body.languageData));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

languageRouter.route('/language/update/:id').put(async (req, res) => {
    try {
        return res.json(await updateLanguage(req.params.id, req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

languageRouter.route('/language/upsert').post(async (req, res) => {
    try {
        return res.json(await upsertLanguage(req.body.languageData));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

languageRouter.get('/language/studentId/:studentId', async (req, res) => {
    try {
      const languages = await getLanguagesByStudentId('studentId', req.params.studentId);
      res.json(languages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

languageRouter.route('/language/delete/:id').delete(async (req, res) => {
    try {
        await deleteLanguage(req.params.id);
        return res.json({ message: 'Language deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default languageRouter;