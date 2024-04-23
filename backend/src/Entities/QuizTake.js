import db from '../dbConfig.js';
import { Sequelize } from 'sequelize';

const QuizTake = db.define('QuizTake', {
    quizTakeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    EngineeringPath: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    DataPath:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    BussinesPath:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    UiUxPath:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    finishDate:{
        type: Sequelize.DATE,
        allowNull: false,
    }
});

export default QuizTake;