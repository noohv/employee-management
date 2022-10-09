import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import employeeRoutes from './routes/employees.js';

const app = express();

app.use('/employees', employeeRoutes)



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const DB_URL = 'mongodb://localhost:27017/EmployeeManagement'
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));