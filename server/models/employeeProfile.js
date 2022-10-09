import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    tags: [String],

});