import express from 'express';
import cors from 'cors';
import env from 'dotenv';

import DB_Init from './src/Entities/db_init.js';
import masterRouter from  './src/Routes/masterRoute.js';
import authRoute from './src/Routes/authRoutes.js';
import userRoute from './src/Routes/userRoutes.js';
import studentRoute from './src/Routes/studentRoutes.js';
import educationRoute from './src/Routes/educationRoutes.js';

env.config();

let app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));


//initializare bd + rute

DB_Init();
app.use("/api", masterRouter);
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", studentRoute);
app.use("/api", educationRoute);

let port = /*process.env.PORT ||*/ 8001;   
app.listen(port);
console.log('API is runnning at ' + port);

