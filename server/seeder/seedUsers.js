import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config()

export const seedAdmin = async () => {
  const user = {
    name: process.env.NAME,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    role: "admin"
  }

  try {
    const existingUser = await User.findOne({email: user.email}) // Find existing user in database
    
    if(existingUser) {
      console.log("Admin exists")
      return
    }
    
    const hashedPassword = await bcrypt.hash(user.password, 12)

    const newUser = new User({ email: user.email, password: hashedPassword, name: user.name, role: user.role })

    newUser.save()
    console.log("Admin created")
  } catch (error) {
    console.log(error)
  }
}
