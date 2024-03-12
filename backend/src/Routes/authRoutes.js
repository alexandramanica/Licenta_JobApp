import express from 'express';
import env from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../Entities/User.js';
import {createUser,updateUser} from '../DataAcces/userDA.js';

let authRoute = express.Router();
env.config();

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user. userId, role: user.role, email:user.email, firstName:user.firstName }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",  algorithm: 'HS256'
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({  userId: user. userId, role: user.role, email:user.email, firstName:user.firstName }, process.env.REFRESH_TOKEN_SECRET);
};

//refresh route
authRoute.route('/refresh').post((req, res) => {

  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not val Id!");
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    console.log('New access token heeeeeei heeei:', newAccessToken);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

//login route
authRoute.route('/login').post(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await loginUser(email, password)

    if(user){
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      res.json({
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken,
      });
    } else{
        res.status(401).json({message : 'Invalid user credentials'})
    }
});

//logout route
authRoute.route('/logout').post((req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});

//register route
authRoute.route('/signup').post(async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



const verifyFunction = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try{
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }

        req.user = user;
        next();
        console.log("User", user)
      });
        
    ;
  } catch(err){
    console.log(err)}}
  else {
    res.status(401).json("You are not authenticated!");
  }};
  


const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};


authRoute.route('/user/update/:id').put(verifyFunction, async (req, res) => {
  try {
  
    console.log('Updating user:', req.params.id);
    console.log('Request body:', req.body);
    console.log('User ID:', req.user.userId);
   
    if(req.user.userId == req.params.id){
     
      // Update user fields
      const updatedUser = await updateUser(req.params.id, {
        email: req.body.email,
        firstName: req.body.firstName,
        password: req.body.password,
        role: req.body.role
      });

      console.log('Updated user:', updatedUser);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
});

export default authRoute;