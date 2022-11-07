import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({ 
    startDate: Date,
    endDate: Date, 
    shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shift" }],
    createdAt: { type: Date, default: new Date() }
});

const scheduleAbsence = mongoose.model('Schedule', scheduleSchema)

export default scheduleAbsence;