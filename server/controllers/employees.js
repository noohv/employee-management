import EmployeeProfile from '../models/employeeProfile.js';

export const getEmployees = async (req, res) => {
    try {
        const employeeProfile =  await EmployeeProfile.find();
        console.log(employeeProfile);

        res.status(200).json(employeeProfile)
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