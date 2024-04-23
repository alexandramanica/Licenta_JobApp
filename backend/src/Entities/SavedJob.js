import db from '../dbConfig.js';
import { Sequelize } from 'sequelize';

const SavedJob = db.define('SavedJob', {
    savedJobId: {
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
});

export default SavedJob;