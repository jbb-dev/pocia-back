import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { IUser, User } from './../models/User';

export const adminController = {

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