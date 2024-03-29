import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

import { IUser, IUserUpdateData, User } from './../models/User';
import { IUserTokenPayload, RequestWithPayload } from '../middlewares/authenticate';

export const userController = {

    subcribe: async function (req: Request, res: Response) {

        try {

            // Check if user already exists
            const existingUser = await User.findUser(req.body.email);
            if (existingUser) 
            {
                return res.status(409).json({ message: 'Your account already exists !' });
            }
    
            // Create the user
            const newUser = await User.createUser(req.body as IUser);
            return res.status(200).json(newUser);

        } catch (error) {
            console.error(`An error occurred during new user creation: ${error}`);
            return res.status(500).json({ message: `An error occurred during your account creation` });
        }

    },

    login: async function (req: Request, res: Response) {
        
        const { email, password } = req.body;

        try {

            // Check if user exists
            const user: IUser = await User.findUser(email);

            if (!user) 
            {
                return res.status(401).json({ message: 'Wrong email or password' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) 
            {
                return res.status(401).json({ message: 'Wrong email or password' });
            }

            // Create user token
            const token = jwt.sign(
                {
                    userId: user._id,
                    generatedAt: new Date()
                }, 
                TOKEN_SECRET
            );

            // Send token and user data
            return res.status(200).json({
                token,
                user: {
                    lastname: user.lastname,
                    firstname: user.firstname,
                    email: user.email,
                    avatar: user.avatar || "",
                    password: ""
                }
            });
            
        } catch (error) {
            console.error(`Error during trying to login : ${error}`);
            res.status(500).json({ message: 'An error occured during login'});
        }
    },

    updateProfile: async function (req: RequestWithPayload, res: Response) {

        const { userId } = req.payload as IUserTokenPayload;

        try {
            // Update the user
            const updatedUser = await User.updateUser(userId, req.body as IUserUpdateData);
            return res.status(200).json(updatedUser);

        } catch (error) {
            console.error(`An error occurred during user update : ${error}`);
            return res.status(500).json({ message: `An error occurred during your profile update` });
        }
    },

    


}