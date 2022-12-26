import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true }, 
  email: { type: String, required: true },
  address: { type: String, required: true },
  jobTitle: { type: mongoose.Schema.Types.ObjectId, ref: "JobTitle" },
  absences: [{ type: mongoose.Schema.Types.ObjectId, ref: "Absence" }],
  startDate: { type: Date, required: true },
  createdAt: { type: Date, default: new Date() }
})

const employeeProfile = mongoose.model('EmployeeProfile', employeeSchema)

export default employeeProfile