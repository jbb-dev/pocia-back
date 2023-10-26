import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { IUser, User } from './../models/User';

export const userController = {

    createNewUser: async function (req: Request, res: Response) {

        // const { firstname, lastname, email, avatar } = req.body;

        try 
        {
            const newUser = new User(req.body as IUser);
            const doc = await newUser.save();
            return res.status(200).send(doc)
        } 
        catch (error) {
            console.log(`An error occured during insert of new User :${error}`);
            return res.status(500);
        }
        
    }

}