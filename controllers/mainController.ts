import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

import { Message } from './../models/Message';

export const mainController = {

    getConversation: async function (req: Request, res: Response) {

        const conversation = [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}
        ];

        res.status(200).send(conversation);

    },

    chatWithAssistant: async function (req: Request, res: Response) {

        const { role, content } = req.body;

        console.log('message => ', req.body)

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content }],
            // messages: [{"role": "system", "content": "You are a helpful assistant."},
            // {"role": "user", "content": "Who won the world series in 2020?"},
            // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            // {"role": "user", "content": "Where was it played?"}],
            model: "gpt-3.5-turbo",
          });

        // console.log("completion => ", completion);
        // console.log(completion.choices[0]);
        

        console.log('chat With assistant, message => ', completion.choices[0].message)

        const chatResponse = completion.choices[0].message.content;
        const newConversation = [{role, content}, {role: 'assistant', content: chatResponse}]

        // Save the message to MongoDB
        // const message = new Message({ user: "toto", text: completion.choices[0].message.content });
        // await message.save();
       // Prevent additional documents from being inserted if one fails
        const options = { ordered: true };
        // Execute insert operation
        try 
        {
            await Message.insertMany(newConversation, options);
            return res.status(200).send(completion.choices[0].message)
        } 
        catch (error) {
            console.log(`An error occured during insert of new Conversation :${error}`);
            return res.status(500);
        }
        
    }

}