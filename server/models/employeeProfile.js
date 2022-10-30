import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    phone: { type: String }, 
    email: { type: String },
    address: { type: String },
    absence: [{ type: mongoose.Schema.Types.ObjectId, ref: "Absence" }],
    startDate: { type: Date, required: true },
    createdAt: { type: Date, default: new Date() }
});

const employeeAbsence = mongoose.model('EmployeeProfile', employeeSchema)

export default employeeAbsence;