import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import User from './User.js';
import Student from './Student.js';
import Education from './Education.js';
import Experience from './Experience.js';
import Language from './Language.js';
import Recruiter from './Recruiter.js';
import Job from './Job.js';
import SavedJob from './SavedJob.js'
import JobApplication from './JobApplication.js'
import QuizTake from './QuizTake.js'

import {DB_USER_STUDENT_ID, DB_STUDENT_EDUCATION_ID,DB_STUDENT_EXPERIENCE_ID,
        DB_STUDENT_LANGUAGE_ID,DB_RECRUITER_JOB_ID,DB_USER_RECRUITER_ID,
        DB_SAVED_JOBS_JOBS,DB_SAVED_JOBS_STUDENT_ID,
        DB_APPLIED_JOB_STUDENT_ID,DB_APPLIED_JOBS_JOBS_ID,
        DB_QUIZ_TAKE_STUDENT_ID} from './dbConst.js';

env.config();

function Create_DB(){
    let conn;

    mysql.createConnection({
        user: process.env.DB_USERNAME,  
        password:process.env.DB_PASSWORD
    })
    .then((connection) => {
        conn = connection;
        return connection.query('CREATE DATABASE IF NOT EXISTS LicentaBD')
    })
    .then(() => {
        return conn.end()
    })
    .catch((err) => {
        console.warn(err.stack)
    })
}

function FK_Config(){

    // QuizTake.sync({ force: true })
    // .then(() => {
    //   console.log('Table has been successfully recreated.');
    // })
    // .catch((error) => {
    //   console.error('Error recreating the User table:', error);
    // });

    User.hasOne(Student, {as: DB_USER_STUDENT_ID,  foreignKey: "userId"});
    Student.belongsTo(User, {foreignKey: "userId"})

    Student.hasMany(Education, {as: DB_STUDENT_EDUCATION_ID,  foreignKey: "studentId"});
    Education.belongsTo(Student, {foreignKey: "studentId"})

    Student.hasMany(Experience, {as: DB_STUDENT_EXPERIENCE_ID,  foreignKey: "studentId"});
    Experience.belongsTo(Student, {foreignKey: "studentId"})

    Student.hasMany(Language, {as: DB_STUDENT_LANGUAGE_ID,  foreignKey: "studentId"});
    Language.belongsTo(Student, {foreignKey: "studentId"})

    User.hasOne(Recruiter, {as: DB_USER_RECRUITER_ID,  foreignKey: "userId"});
    Recruiter.belongsTo(User, {foreignKey: "userId"})

    Recruiter.hasMany(Job, {as: DB_RECRUITER_JOB_ID,  foreignKey: "recruiterId"});
    Job.belongsTo(Recruiter, {foreignKey: "recruiterId"})

    Student.belongsToMany(Job, { through: SavedJob, as: DB_SAVED_JOBS_JOBS, foreignKey: "studentId" });
    Job.belongsToMany(Student, { through: SavedJob, as: DB_SAVED_JOBS_STUDENT_ID, foreignKey: "jobId" });

    Student.belongsToMany(Job, { through: JobApplication, as: DB_APPLIED_JOB_STUDENT_ID, foreignKey: "studentId" });
    Job.belongsToMany(Student, { through: JobApplication, as: DB_APPLIED_JOBS_JOBS_ID, foreignKey: "jobId" });

    Student.hasMany(QuizTake, {as: DB_QUIZ_TAKE_STUDENT_ID,  foreignKey: "studentId"});
    QuizTake.belongsTo(Student, {foreignKey: "studentId"})
}

function DB_Init(){
    Create_DB();
    FK_Config();
}

export default DB_Init;