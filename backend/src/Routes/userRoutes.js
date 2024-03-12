import express from 'express';
// import { verify } from '../Routes/authRoutes.js';
import{
    getUserById,
    getUsers,
    createUser,
    updateUser
    } from '../DataAcces/userDA.js';


const userRouter = express.Router();

userRouter.route('/users').get(async (req, res) => {
    try {
        return res.json(await getUsers());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userRouter.route('/users/:id').get(async (req, res) => {
    try {
        return res.json(await getUserById(req.params.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userRouter.route('/user').post(async (req, res) => {
    try {
        return res.json(await createUser(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// userRouter.route('/user/update/:id').put(verify, async (req, res) => {
//     try {
//         console.log(req.user.userId, req.params.id);
     
//         console.log('HAHAHAHAHA');
//         if(req.user.userId == req.params.id){

//             return res.json(await updateUser(req.params.id, req.body));
            
//         } else {
//             return res.status(403).json({ message: 'Unauthorized' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

export default userRouter;


