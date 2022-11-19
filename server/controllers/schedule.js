import { addHours } from 'date-fns';
import mongoose from 'mongoose';
import Schedule from '../models/schedule.js';

export const createSchedule = async (req, res) => {
  const data = req.body
  const formatData = {
    shiftCount: data.shiftCount,
    startDate: addHours(new Date(data.dates[0].startDate), 2),
    endDate: addHours(new Date(data.dates[0].endDate), 2)
  }
  const schedule = new Schedule(formatData)

  try {
    await schedule.save()
    res.status(201).json(schedule)
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}

export const getSchedules = async (req,res) => {
  try {
    const schedules =  await Schedule.find()
    res.status(200).json(schedules)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}