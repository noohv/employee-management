import mongoose from 'mongoose';
import EmployeeProfile from '../models/employeeProfile.js';

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
        const employee = await EmployeeProfile.findById(id)

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

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with ID");

    const updatedEmployee = await EmployeeProfile.findByIdAndUpdate(id, employee, { new: true });

    res.json(updatedEmployee)
}