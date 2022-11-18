import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({ 
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  shiftCount: { type: Number, min: 1, max: 3, required: true },
  // shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shift" }],
  createdAt: { type: Date, default: new Date() }
})

const scheduleAbsence = mongoose.model('Schedule', scheduleSchema)

export default scheduleAbsence