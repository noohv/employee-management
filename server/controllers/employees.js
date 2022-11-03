import mongoose from 'mongoose';
import EmployeeProfile from '../models/employeeProfile.js';
import EmployeeAbsence from "../models/employeeAbsence.js";

export const getEmployees = async (req, res) => {
    try {
        const employeeProfile =  await EmployeeProfile.find();
        
        res.status(200).json(employeeProfile)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getEmployee = async (req, res) => {
    const { id } = req.params;
    
    try {
        const employee = await EmployeeProfile.findById(id).populate("absence");

        res.status(200).json(employee)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createEmployee = async (req, res) => {
    const employee = req.body;
    
    const newEmployee = new EmployeeProfile(employee)
    try {
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(409).json({ message:error.message })
    }
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No employee with ID");

    const updatedEmployee = await EmployeeProfile.findByIdAndUpdate(id, employee, { new: true }).populate("absence");

    res.json(updatedEmployee)
}

export const createAbsence = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const absence = await EmployeeAbsence.create(data)
        const employee = await EmployeeProfile.findById(id)
        employee.absence.push(absence._id)    
        await employee.save()
        res.status(201).json(absence);
    } catch (error) {
        res.status(409).json({ message:error.message })
    }
}

export const deleteAbsence = async (req,res) => {
    const { id } = req.params;
    try {
        const absence = await EmployeeAbsence.findById(id)
        await absence.remove()
        
        res.status(200).json(id)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const deleteEmployee = async (req,res) => {
    const { id } = req.params;

    try {
        const employee = await EmployeeProfile.findById(id)
        const absences = employee.absence

        await employee.remove()

        for(let i = 0; i < absences.length; i++) {
            const abs = await EmployeeAbsence.findById(absences[i])
            await abs.remove()
        }
        res.status(200).json(id)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}