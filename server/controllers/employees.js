import mongoose from 'mongoose';
import EmployeeProfile from '../models/employeeProfile.js';
import EmployeeAbsence from "../models/employeeAbsence.js";
import JobTitle from '../models/employeeJobTitle.js';
import { OTHER_ERROR, EMPLOYEE_NOT_FOUND, ABSENCE_EXIST, ABSENCE_NOT_FOUND } from '../errorMessages.js';

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employeeProfile =  await EmployeeProfile.find().populate("absences jobTitle")
      
    res.status(200).json(employeeProfile)
  } catch (error) {
    res.status(404).json({ message: OTHER_ERROR })
  }
}

// Get single employee
export const getEmployee = async (req, res) => {
  const { id } = req.params
  
  try {
    const employee = await EmployeeProfile.findById(id).populate("absences jobTitle")

    res.status(200).json(employee)
  } catch (error) {
    res.status(404).json({ message: EMPLOYEE_NOT_FOUND })
  }
}

// Create new Employee
export const createEmployee = async (req, res) => {
  const employee = req.body
  const newEmployee = new EmployeeProfile(employee)
  
  try {
    const jobTitle = await JobTitle.findById(employee.jobTitle)
    jobTitle.employees.push(newEmployee._id)

    await jobTitle.save()
    await newEmployee.save()
    res.status(201).json(newEmployee)
  } catch (error) {
    res.status(409).json({ message: OTHER_ERROR })
  }
}

// Update single employee
export const updateEmployee = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {    
    const updatedEmployee = await EmployeeProfile.findById(id).populate('absences jobTitle') // Employee before
    const oldJobTitle = await JobTitle.findById(updatedEmployee.jobTitle).populate('employees') // Previous job title
    const newJobTitle = await JobTitle.findById(data.jobTitle).populate('employees') // Newly selected job title

    // Employee has job title before
    if(oldJobTitle) {

      // Job title change has been made
      if(oldJobTitle.id !== newJobTitle.id) {

        // Add employee ID to new Job Title document employees array
        if(!newJobTitle.employees.some(i => i.id === id )) {      
          newJobTitle.employees.push(updatedEmployee._id)
          await newJobTitle.save()
        }
        
        oldJobTitle.employees = oldJobTitle.employees.filter(i => i.id !== id)
        await oldJobTitle.save()
      }
    }
    else {
      // Add employee ID to new Job Title document employees array
      if(!newJobTitle.employees.some(i => i.id === id )) {      
        newJobTitle.employees.push(updatedEmployee._id)
        await newJobTitle.save()
      }
    }
    
    await updatedEmployee.updateOne(data, { new: true })
    res.status(200).json(updatedEmployee)
  } catch (error) {
    res.status(404).json({ message: EMPLOYEE_NOT_FOUND })
  }
}

// Delete single employee
export const deleteEmployee = async (req,res) => {
  const { id } = req.params

  try {
    const employee = await EmployeeProfile.findById(id)
    const absences = employee.absences
    const jobTitle = await JobTitle.findById(employee.jobTitle).populate('employees')
    
    // Remove all employee absences
    for(let i = 0; i < absences.length; i++) {
      const abs = await EmployeeAbsence.findById(absences[i])
      await abs.remove()
    }
    
    // Update employee list for job title document
    if(jobTitle) {
      jobTitle.employees = jobTitle.employees.filter((i) => i.id !== employee.id)
      await jobTitle.save()
    }
    
    await employee.remove()
    res.status(200).json(id)
  } catch (error) {
    res.status(404).json({ message: OTHER_ERROR })
  }
}

// EMPLOYEE ABSENCES

// Create employee absence
export const createAbsence = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const employee = await EmployeeProfile.findById(id).populate('absences')
    if(!employee) return res.status(404).json({ message: EMPLOYEE_NOT_FOUND })
    
    // Check if date ranges are not overlapping
    if(employee.absences.length > 0) {
      if(employee.absences.some(i => (i.startDate.toISOString().slice(0, 10) <= data.endDate) && (data.startDate <= i.endDate.toISOString().slice(0, 10))))
      return res.status(400).json({ message: ABSENCE_EXIST })
    }
    
    const absence = await EmployeeAbsence.create(data)
    employee.absences.push(absence._id)    
    await employee.save()
    res.status(201).json(absence)
  } catch (error) {
    res.status(409).json({ message: OTHER_ERROR })
  }
}

// Update employee absence
export const updateAbsence = async (req, res) => {
  const { id, empId } = req.params
  const data = req.body

  try {
    const absence = await EmployeeAbsence.findById(id)
    const employee = await EmployeeProfile.findById(empId).populate("absences")
    if(!absence) return res.status(404).json({ message: ABSENCE_NOT_FOUND })
    if(!employee) return res.status(404).json({ message: EMPLOYEE_NOT_FOUND })
    
    // Check if date ranges are not overlapping with OTHER absences of the employee
    if(employee.absences.length > 0) {
      if(employee.absences.some(i => 
        (i.startDate.toISOString().slice(0, 10) <= data.endDate) 
          && (data.startDate <= i.endDate.toISOString().slice(0, 10)) 
          && i.id !== id )
      )
        return res.status(400).json({ message: ABSENCE_EXIST })
    }
    
    await absence.updateOne(data, {new: true})
    res.status(201).json(absence)
  } catch (error) {
    res.status(409).json({ message: OTHER_ERROR })
  }
}

// Delete employee absence
export const deleteAbsence = async (req,res) => {
  const { id, empId } = req.params
  try {
    const absence = await EmployeeAbsence.findById(id)
    const employee = await EmployeeProfile.findById(empId).populate("absences")
    
    if(!absence) return res.status(404).json({ message: ABSENCE_NOT_FOUND })
    if(!employee) return res.status(404).json({ message: EMPLOYEE_NOT_FOUND })
  
    // Update absence list for employee document
    employee.absences = employee.absences.filter((i) => i.id !== id)

    await absence.remove()
    await employee.save()
    res.status(200).json(id)
  } catch (error) {
    res.status(409).json({ message: OTHER_ERROR })
  }
}