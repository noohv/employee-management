import { addHours, startOfWeek, endOfWeek } from 'date-fns';
import mongoose from 'mongoose';
import Schedule from '../models/schedule.js';
import EmployeeProfile from '../models/employeeProfile.js';

export const createSchedule = async (req, res) => {
  const data = req.body
  const selectedDate = new Date(data.selectedDate)
  let formatData = {
    startDate: addHours(startOfWeek(selectedDate, {weekStartsOn: 1}), 2),
    endDate: addHours(endOfWeek(selectedDate, {weekStartsOn: 1}), 2),
    shifts: {
      morning: data.shifts.morning,
      evening: data.shifts.evening,
      night: data.shifts.night
    },
    employeeSchedules: []
  }

  try {
    const schedules = await Schedule.find()
    const employeeList = await EmployeeProfile.find()
    for(const emp of employeeList) {
      formatData = {...formatData, employeeSchedules: [...formatData.employeeSchedules, {employee: emp}]}
    }
  
    // Check if date ranges are not overlapping
    if(schedules.some(i => (i.startDate.toISOString().slice(0,10) <= formatData.endDate.toISOString().slice(0,10)) && (formatData.startDate.toISOString().slice(0,10) <= i.endDate.toISOString().slice(0,10))))
      return res.status(400).json({ message: "Grafiks šajā laika periodā jau ir pievienots!" })

    if(!formatData.shifts.morning && !formatData.shifts.evening && !formatData.shifts.night)
      return res.status(400).json({ message: "Izvēlieties vismaz vienu maiņu!" })

    const schedule = new Schedule(formatData)

    await schedule.save()
    res.status(201).json(schedule)
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}

export const getSchedules = async (req, res) => {
  try {
    const schedules =  await Schedule.find().populate('shifts')
    res.status(200).json(schedules)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getSchedule = async (req, res) => {
  const { id } = req.params

  try {
    const schedule =  await Schedule.findById(id).populate('shifts employeeSchedules.employee employeeSchedules.employee.absences')
    res.status(200).json(schedule)
  } catch (error) {
    res.status(404).json({ message: "Grafiks nav atrasts!" })
  }
}

export const updateSchedule = async (req, res) => {
  const { id, empId } = req.params
  const employeeSchedule = req.body

  try {
    // const updatedSchedule = await Schedule.findByIdAndUpdate(id, employeeSchedule, { new: true }).populate("shifts employeeSchedules.employee employeeSchedules.employee.absences")
    res.json(employeeSchedule)
    console.log(employeeSchedule)
  } catch (error) {
    res.status(404).json({ message: "Grafiks nav atrasts!"})
  }
}

export const deleteSchedule = async (req, res) => {
  const { id } = req.params
  try {
    const schedule = await Schedule.findById(id)
    await schedule.remove()
  } catch (error) {
    res.status(404).json({ message: "Neizdevās dzēst!"})
  }
}