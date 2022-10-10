import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    startDate: Date,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const employeeProfile = mongoose.model('EmployeeProfile', employeeSchema)

export default employeeProfile;