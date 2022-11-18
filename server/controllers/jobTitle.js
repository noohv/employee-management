import mongoose from 'mongoose';
import JobTitle from '../models/employeeJobTitle.js';

export const createJobTitle = async (req, res) => {
  const data = req.body
  const newJobTitle = new JobTitle(data)
  try {
    await newJobTitle.save()
    res.status(201).json(newJobTitle);
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}

export const getJobTitles = async (req, res) => {
  try {
    const jobTitles =  await JobTitle.find().populate('employees')
    res.status(200).json(jobTitles)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getJobTitle = async (req, res) => {
  const { id } = req.params
    
  try {
    const jobTitle = await JobTitle.findById(id).populate('employees')
    res.status(200).json(jobTitle)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}