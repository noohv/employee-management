import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';
import { INCORRECT_PASSWORD, USER_NOT_FOUND, PASSWORDS_NOT_MATCHING, USER_CREATE_ERROR, OTHER_ERROR, USER_EXISTS, SIGNIN_ERROR } from '../errorMessages.js';

dotenv.config()

// User sign in (log in)
export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email }) // Find existing user in database
    
    if(!existingUser) return res.status(404).json({ message: USER_NOT_FOUND }) // Message return if user does not exist
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    
    if(!isPasswordCorrect) return res.status(400).json({ message: INCORRECT_PASSWORD })
    
    const token = jwt.sign({ email:existingUser.email, id:existingUser._id }, process.env.TOKEN, {expiresIn: '8h' })
    
    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: SIGNIN_ERROR })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: OTHER_ERROR })  
  }
}

// Create new system user
export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, role } = req.body

  try {
    const existingUser = await User.findOne({ email }) // Find existing user in database
    
    if(existingUser) return res.status(400).json({ message: USER_EXISTS }) // Message return if user does not exist
    
    if(password !== confirmPassword) return res.status(400).json({ message: PASSWORDS_NOT_MATCHING })

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({ email, password: hashedPassword, name: `${firstName} ${lastName}`, role })

    newUser.save()
    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json({ message: USER_CREATE_ERROR })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    
    await user.remove()
    res.status(200).json(id)
  } catch (error) {
    res.status(404).json({ message: USER_NOT_FOUND })
  }
}