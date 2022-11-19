import { addHours } from 'date-fns';
import mongoose from 'mongoose';
import Schedule from '../models/schedule.js';
import Shift from '../models/shift.js';

export const createSchedule = async (req, res) => {
  const data = req.body
  const formatData = {
    startDate: addHours(new Date(data.dates[0].startDate), 2),
    endDate: addHours(new Date(data.dates[0].endDate), 2)
  }
  const schedule = new Schedule(formatData)

  try {
    for(const shift in data.shifts) {
      let name
      if(shift == 'morning') name = 'Rīta'
      if(shift == 'evening') name = 'Vakara'
      if(shift == 'night') name = 'Nakts'
  
      if(data.shifts[shift]) {
        const newShift = new Shift({name: name})
        await newShift.save()
        schedule.shifts.push(newShift._id)
      }
    }
    await schedule.save()
    res.status(201).json(schedule)
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}

export const getSchedules = async (req,res) => {
  try {
    const schedules =  await Schedule.find().populate('shifts')
    res.status(200).json(schedules)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}