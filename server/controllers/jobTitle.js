import mongoose from 'mongoose';
import EmployeeProfile from '../models/employeeProfile.js';
import JobTitle from '../models/employeeJobTitle.js';

export const createJobTitle = async (req, res) => {
    const data = req.body;
    const newJobTitle = new EmployeeProfile(data)
    try {
        await newJobTitle.save();
        res.status(201).json(newJobTitle);
    } catch (error) {
        res.status(409).json({ message:error.message })
    }
}

export const updateJobTitle = async (req, res) => {
    const newData = req.body;
    try {
        res.status(200).json()
    } catch (error) {
        res.status(409).json({ message:error.message }) 
    }
}