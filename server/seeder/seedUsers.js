import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config()

export const seedAdmin = async () => {
  try {
    // Create initial admin account if all the values are provided
    if(process.env.EMAIL && process.env.NAME && process.env.PASSWORD) {
      const existingUser = await User.findOne({email: process.env.EMAIL}) // Find existing user in database
    
      if(!existingUser) {
        const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 12)
  
        const newUser = new User({ email: process.env.EMAIL, password: hashedPassword, name: process.env.NAME, role: "admin" })
    
        newUser.save()
        console.log("Initial admin account created")
      }
    }
  } catch (error) {
    console.log(error)
  }
}