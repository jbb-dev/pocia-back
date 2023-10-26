import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { IUser, User } from './../models/User';

export const userController = {

    createNewUser: async function (req: Request, res: Response) {

        // const { firstname, lastname, email, avatar } = req.body;

        try 
        {
            const newUser = await User.createUser(req.body as IUser)
            return res.status(200).send(newUser);
        } 
        catch (error) {
            console.log(`An error occured during insert of new Conversation :${error}`);
            return res.status(500).send({message: `An error occured during user creation => ${error}`});
        }
    }

}