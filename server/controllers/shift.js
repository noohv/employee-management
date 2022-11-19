import mongoose from 'mongoose';
import Shift from '../models/shift.js';

export const updateShift = async (data, res) => {
  const newShift = new Shift(data)

  try {
    await newShift.save()
    res.status(201).json(newShift)
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}