import mongoose from 'mongoose';

const absenceSchema = mongoose.Schema({
  absenceType: { type: String, required: true }, 
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }, 
  createdAt: { type: Date, default: new Date() }
})

const employeeAbsence = mongoose.model('Absence', absenceSchema)

export default employeeAbsence