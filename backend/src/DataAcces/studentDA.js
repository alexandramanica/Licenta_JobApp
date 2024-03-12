import Student from "../Entities/Student.js";
import  pick  from "lodash";

async function getStudents(){
    return await Student.findAll();
}

async function getStudentById(id){
    let student = await Student.findByPk(id); 
    if (!student) throw new Error('student not found');
    return student;
}

async function createStudent(studentData){
    try {
        console.log('Received data', studentData);
        const student= await Student.create(studentData);
        console.log('student created', student);
        return student;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateStudent(idstudent, studentData){
    try {
        let student = await Student.findByPk(idstudent);
        if (!student) throw new Error('student not found');

        student = await Student.update(studentData);
        console.log('student updated', student);
        return student;
    } catch (error) {
        throw error;
    }
}

async function upsertStudent(studentData){
    try {
        const [student, created] = await Student.upsert(studentData, {
            returning: true
        });
        console.log(created ? 'student created' : 'student updated', student);
        return student;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export { getStudents, getStudentById, createStudent, updateStudent,upsertStudent};
        
    