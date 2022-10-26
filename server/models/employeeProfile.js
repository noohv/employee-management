import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    phone: { type: String }, 
    email: { type: String },
    address: { type: String },
    leaves: [{ type: String, startDate: Date, endDate: Date, reason: String }],
    startDate: { type: Date, required: true },
    createdAt: { type: Date, default: new Date() }
});

const employeeProfile = mongoose.model('EmployeeProfile', employeeSchema)

export default employeeProfile;