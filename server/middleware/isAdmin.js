import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config()

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if(user?.role !== "admin") {
      return res.status(403).send("Access denied")
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

export default isAdmin