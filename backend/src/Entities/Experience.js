import db from '../dbConfig.js';
import { Sequelize } from 'sequelize';

const Experience = db.define('Experience', {
    experienceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    positionTitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    experienceDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    startYear: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    endYear: {
        type: Sequelize.DATE,
        allowNull: true, // This can be null if the job is ongoing
    },
});

export default Experience;