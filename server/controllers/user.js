import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/user.js';

dotenv.config();

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }); // Find existing user in database
        
        if(!existingUser) return res.status(404).json({ message: "Lietotājs neeksistē" }); // Message return if user does not exist
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({ message: "Nepareizi dati!" });
        
        const token = jwt.sign({ email:existingUser.email, id:existingUser._id }, process.env.TOKEN, {expiresIn: '1h' });
        
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Neizdevās pieslēgties!" })
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email }); // Find existing user in database
        
        if(existingUser) return res.status(400).json({ message: "Lietotājs jau eksistē" }); // Message return if user does not exist
        
        if(password !== confirmPassword) return res.status(400).json({ message: "Paroles nesakrīt" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email:result.email, id:result._id }, process.env.TOKEN, {expiresIn: '1h'} )
    
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Neizdevās reģistrēties!" })
    }
};