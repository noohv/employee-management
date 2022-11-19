import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({ 
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shift" }],
  createdAt: { type: Date, default: new Date() }
})

const schedule = mongoose.model('Schedule', scheduleSchema)

export default schedule