import mongoose from 'mongoose';
import EmployeeProfile from '../models/employeeProfile.js';
import EmployeeAbsence from "../models/employeeAbsence.js";
import JobTitle from '../models/employeeJobTitle.js';

export const getEmployees = async (req, res) => {
  try {
    const employeeProfile =  await EmployeeProfile.find().populate("absences jobTitle")
      
    res.status(200).json(employeeProfile)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  
  try {
    const employee = await EmployeeProfile.findById(id).populate("absences jobTitle")

    res.status(200).json(employee)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createEmployee = async (req, res) => {
  const employee = req.body;
  const newEmployee = new EmployeeProfile(employee)
  
  try {
    const jt = await JobTitle.findById(employee.jobTitle)
    jt.employees.push(newEmployee._id)
    await jt.save()
    await newEmployee.save()
    res.status(201).json(newEmployee)
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}

export const updateEmployee = async (req, res) => {
  const { id } = req.params
  const employee = req.body

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No employee with ID")

  const updatedEmployee = await EmployeeProfile.findByIdAndUpdate(id, employee, { new: true }).populate("absences")

  res.json(updatedEmployee)
}

export const deleteEmployee = async (req,res) => {
  const { id } = req.params;

  try {
  const employee = await EmployeeProfile.findById(id)
  const absences = employee.absences
  const jobTitle = await JobTitle.findById(employee.jobTitle)

  await employee.remove()

  jobTitle.employees = jobTitle.employees.filter((i) => i.id !== employee.id)
  await jobTitle.save()
  for(let i = 0; i < absences.length; i++) {
    const abs = await EmployeeAbsence.findById(absences[i])
    await abs.remove()
  }

  res.status(200).json(id)
  } catch (error) {
    res.status(404).json({ message: error.message})
  }
}

// EMPLOYEE ABSENCES

export const createAbsence = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const absence = await EmployeeAbsence.create(data)
    const employee = await EmployeeProfile.findById(id)
    employee.absences.push(absence._id)    
    await employee.save()
    res.status(201).json(absence)
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}

export const deleteAbsence = async (req,res) => {
  const { id, empId } = req.params
  try {
    const absence = await EmployeeAbsence.findById(id)
    const employee = await EmployeeProfile.findById(empId).populate("absences")
    employee.absences = employee.absences.filter((i) => i.id !== id)

    await absence.remove()
    await employee.save()
    res.status(200).json(id)
  } catch (error) {
    res.status(404).json({ message: error.message})
  }
}