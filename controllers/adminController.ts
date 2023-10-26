import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();


import { IUser, User } from './../models/User';
import { IAssistant, Assistant } from './../models/Assistant';

export const adminController = {

    createNewAssistant: async function (req: Request, res: Response) {

        try 
        {
            const newAssistant = await Assistant.createAssistant(req.body as IAssistant);
            return res.status(200).send(newAssistant);
        } 
        catch (error) {
            console.log(`An error occured during creation of new Assistant :${error}`);
            return res.status(500).send({message: `An error occured during new assistant creation => ${error}`});
        }
    },

    getUsers: async function (req: Request, res: Response) {

        try {
            const users: IUser[] = await User.getUsers();
            return res.status(200).json({ success: true, users });
        } catch (error) {
            console.log(`An error occured during getting the users :${error}`);
            return res.status(500).send({message: `An error occured during getting users => ${error}`});
        }
    }

}