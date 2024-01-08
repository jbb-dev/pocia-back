import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { IAssistant, Assistant } from '../models/Assistant';

export const assistantController = {

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

    getAssistants: async function (req: Request, res: Response) {

        try {
            const assistants : IAssistant[] = await Assistant.getAssistants();
            return res.status(200).json(assistants);
        } catch (error) {
            console.log(`An error occured during getting the assistants  :${error}`);
            return res.status(500).send({message: `An error occured during getting assistants  => ${error}`});
        }
    }

}