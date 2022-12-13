import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ACCESS_DENIED } from '../errorMessages.js';

dotenv.config()

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    
    let decodedData = jwt.verify(token, process.env.TOKEN)
    req.userId = decodedData?.id

    next()
  } catch (error) {
    return res.status(403).send(ACCESS_DENIED)
  }
}

export default auth