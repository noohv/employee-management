import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import employeeRoutes from './routes/employees.js';
import userRoutes from './routes/user.js';
import jobTitleRoutes from './routes/jobTitle.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/employees', employeeRoutes);
app.use('/jobtitle', jobTitleRoutes)


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));