import mongoose from 'mongoose';

const shiftSchema = mongoose.Schema({ 
  name: { type: String, required: true },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "EmployeeProfile" }],
  createdAt: { type: Date, default: new Date() }
})

const shift = mongoose.model('Shift', shiftSchema)

export default shift