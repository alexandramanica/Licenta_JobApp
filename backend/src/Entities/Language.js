import db from '../dbConfig.js';
import { Sequelize } from 'sequelize';

const Language = db.define('Language', {
    languageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    languageName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    proficiencyLevel: {
        type: Sequelize.ENUM,
        values: ['Begginer', 'Intermediate', 'Advanced', 'Fluent','Native'],
        allowNull: false,
    },
});

export default Language;