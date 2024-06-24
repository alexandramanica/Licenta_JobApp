import db from '../dbConfig.js';
import { Sequelize } from 'sequelize';

const Job = db.define('Job', {
    jobId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    recruiterId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    jobTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    jobResponsabilities:{
        type: Sequelize.STRING(3000),
        allowNull: false,
    },
    jobDescription: {
      type: Sequelize.STRING(3000),
      allowNull: false,
    },
    jobRequirements: {
      type: Sequelize.STRING(3000),
      allowNull: false,
    },
    jobType:{
        type: Sequelize.ENUM,
        values: ['Full-Time', 'Part-Time', 'Internship'],
        allowNull: false,
    },
    jobRegime:{
        type: Sequelize.ENUM,
        values: ['Remote', 'On-Site', 'Hybrid'],
        allowNull: false,
    },
    jobPath:{
      type: Sequelize.ENUM,
      values: ['Engineering', 'Data', 'UI-UX','Business'],
      allowNull: false,
  },
    location:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    salary:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    jobDate:{
        type: Sequelize.DATE,
        allowNull: false,
    }
});

export default Job;