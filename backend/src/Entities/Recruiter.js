import db from '../dbConfig.js';
import { Sequelize } from 'sequelize';

const Recruiter = db.define('Recruiter', {
    recruiterId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recruiterFirstName:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    recruiterLastName:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    aboutCompany: {
      type: Sequelize.STRING(3000),
      allowNull: false,
    },
    location:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber:{
        type: Sequelize.STRING,
        allowNull: false,
    },
});

export default Recruiter;