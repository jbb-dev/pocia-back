import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { IUser, User } from './../models/User';

export const userController = {

    createNewUser: async function (req: Request, res: Response) {

        // Check if user already exists
        try {

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
            return res.status(500).send({ message: `An error occurred during your account creation => ${error}` });
        }

    },

    // login: async function (req: Request, res: Response) {

    //     const { email, password } = req.body;
    //     const formatedMail = email.toLowerCase();

    //     // TODO verify pseudo length, mail regex, password :
    //     await models.account
    //     .findOne({ 
    //         where: { email: formatedMail },
    //         include: [{
    //             model: models.subscription,
    //         }]
    //     })
    // }


}