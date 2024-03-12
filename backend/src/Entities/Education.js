import db from '../dbConfig.js';
import { Sequelize } from 'sequelize';

const Education = db.define('Education', {
    educationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    institutionName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    degreeType: {
        type: Sequelize.ENUM,
        values: ['Bachelor', 'Master', 'PhD', 'Associate','Highschool', 'Other'],
        allowNull: false,
    },
    fieldOfStudy: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    startYear: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    endYear: {
        type: Sequelize.DATE,
        allowNull: true, // This can be null if the education is ongoing
    },
});

export default Education;