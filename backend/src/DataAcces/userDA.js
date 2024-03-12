import User from "../Entities/User.js";
import  pick  from "lodash";

async function getUsers(){
    return await User.findAll();
}

async function getUserById(id){
    let user = await User.findByPk(id); 
    if (!user) throw new Error('User not found');
    return user;
}

async function createUser(userData){
    try {
        console.log('Received data', userData);
        const user= await User.create(userData);
        console.log('User created', user);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateUser(idUser, userData){
    try {
        let user = await User.findByPk(idUser);
        if (!user) throw new Error('User not found');

        user = await user.update(userData);
        console.log('User updated', user);
        return user;
    } catch (error) {
        throw error;
    }
}

export { getUsers, getUserById, createUser, updateUser};
        
    