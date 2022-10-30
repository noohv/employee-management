import mongoose from 'mongoose';

const absenceSchema = mongoose.Schema({
    absenceType: String, 
    startDate: Date,
    endDate: Date, 
    reason: String,
    createdAt: { type: Date, default: new Date() }
});

const employeeProfile = mongoose.model('Absence', absenceSchema)

export default employeeProfile;