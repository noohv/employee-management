import mongoose from 'mongoose';

const jobTitleSchema = mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "EmployeeProfile" }],
})

const jobTitle = mongoose.model('JobTitle', jobTitleSchema)

export default jobTitle