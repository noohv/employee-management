import mongoose from 'mongoose';

const shiftSchema = mongoose.Schema({ 
    startTime: Date,
    endTime: Date, 
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "EmployeeProfile" }],
    createdAt: { type: Date, default: new Date() }
});

const scheduleAbsence = mongoose.model('Schedule', scheduleSchema)

export default scheduleAbsence;