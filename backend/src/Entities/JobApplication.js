import db from '../dbConfig.js';
import { Sequelize } from 'sequelize';

const JobApplication = db.define('JobApplication', {
    applicationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    applicationDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

export default JobApplication;