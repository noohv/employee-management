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
  const { id } = req.params
  
  try {
    const employee = await EmployeeProfile.findById(id).populate("absences jobTitle")

    res.status(200).json(employee)
  } catch (error) {
    res.status(404).json({ message: "Lietotājs nav atrasts!" })
  }
}

export const createEmployee = async (req, res) => {
  const employee = req.body
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

  try {
    const updatedEmployee = await EmployeeProfile.findByIdAndUpdate(id, employee, { new: true }).populate("absences jobTitle")
    res.json(updatedEmployee)
  } catch (error) {
    res.status(404).json({ message: "Lietotājs nav atrasts!"})
  }
}

export const deleteEmployee = async (req,res) => {
  const { id } = req.params;

  try {
    const employee = await EmployeeProfile.findById(id)
    const absences = employee.absences
    const jobTitle = await JobTitle.findById(employee.jobTitle).populate('employees')

    await employee.remove()

    jobTitle.employees = jobTitle.employees.filter((i) => i.id !== employee.id)

    await jobTitle.save()
    for(let i = 0; i < absences.length; i++) {
      const abs = await EmployeeAbsence.findById(absences[i])
      await abs.remove()
    }

    res.status(200).json(id)
  } catch (error) {
    res.status(404).json({ message: "Neizdevās dzēst!"})
  }
}

// EMPLOYEE ABSENCES

export const createAbsence = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const employee = await EmployeeProfile.findById(id).populate('absences')
    if(!employee) return res.status(404).json({ message: "Darbinieks vairs neeksistē!" })
    
    // Check if date ranges are not overlapping
    if(employee.absences.length > 0) {
      if(employee.absences.some(i => (i.startDate.toISOString().slice(0,10) <= data.endDate) && (data.startDate <= i.endDate.toISOString().slice(0,10))))
      return res.status(400).json({ message: "Prombūtne šajā laika periodā jau ir pievienota!" })
    }
    
    const absence = await EmployeeAbsence.create(data)
    employee.absences.push(absence._id)    
    await employee.save()
    res.status(201).json(absence)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const deleteAbsence = async (req,res) => {
  const { id, empId } = req.params
  try {
    const absence = await EmployeeAbsence.findById(id)
    const employee = await EmployeeProfile.findById(empId).populate("absences")
    if(!employee) return res.status(404).json({ message: "Darbinieks vairs neeksistē!" })
    employee.absences = employee.absences.filter((i) => i.id !== id)

    await absence.remove()
    await employee.save()
    res.status(200).json(id)
  } catch (error) {
    res.status(404).json({ message: "Prombūtne nav atrasta!"})
  }
}