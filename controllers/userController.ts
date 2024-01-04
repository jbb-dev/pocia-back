import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import { IUser, User } from './../models/User';

export const userController = {

    subcribe: async function (req: Request, res: Response) {

        try {

            // Check if user already exists
            const existingUser = await User.findUser(req.body.email);
            if (existingUser) 
            {
                return res.status(409).send({ message: 'Your account already exists !' });
            }
    
            // Create the user
            const newUser = await User.createUser(req.body as IUser);
            return res.status(200).send(newUser);

        } catch (error) {
            console.error(`An error occurred during new user creation: ${error}`);
            return res.status(500).send({ message: `An error occurred during your account creation` });
        }

    },

    login: async function (req: Request, res: Response) {
        
        const { email, password } = req.body;

        try {

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) 
            {
                return res.status(401).send({ message: 'Wrong email or password' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) 
            {
                return res.status(401).send({ message: 'Wrong email or password' });
            }

            res.status(200).send({ message: 'Your have been successfully connected' });
        } catch (error) {
            console.error(`Error during trying to login : ${error}`);
            res.status(500).send({ message: 'An error occured during login'});
        }

    }


}