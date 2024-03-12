import db from '../dbConfig.js';
import { Sequelize } from 'sequelize';

const Student = db.define('Student', {
    studentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    aboutStudent: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    placeToWork:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber:{
        type: Sequelize.STRING,
        allowNull: false,
    },

});

export default Student;