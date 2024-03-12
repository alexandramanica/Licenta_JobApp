import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import User from './User.js';
import Student from './Student.js';
import Education from './Education.js';
import {DB_USER_STUDENT_ID, DB_STUDENT_EDUCATION_ID} from './dbConst.js';

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

    // Education.sync({ force: true })
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
}

function DB_Init(){
    Create_DB();
    FK_Config();
}

export default DB_Init;