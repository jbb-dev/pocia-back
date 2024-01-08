import { Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

import { EWriterRole, IMessage, Message } from '../models/Message';
import { Conversation, IConversation } from '../models/Conversation';
import { IUserTokenPayload, RequestWithPayload } from '../middlewares/authenticate';
import { IAssistant } from '~~/models/Assistant';

export const conversationController = {

    getOneConversation: async function (req: RequestWithPayload, res: Response) {

        const { userId } = req.payload as IUserTokenPayload;
        const { assistantId } = req.params;

        try 
        {
            const conversation: IConversation | null = await Conversation.findOne({userId, assistantId});
            
            if(conversation != null)
            {

                await Message.find({conversationId: conversation._id})
                .then(messages => res.status(200).send(messages))
                .catch(error => {
                    console.log(`An error occured during searching messages from conversation :${error}`);
                    return res.status(500);
                })
            }
            else
            {
                return res.status(200).json([]);
            }
        } 
        catch (error) {
            console.log(`An error occured during searching conversation :${error}`);
            return res.status(500);
        }
    },

    chatWithAssistant: async function (req: RequestWithPayload, res: Response) {

        const { userId } = req.payload as IUserTokenPayload;
        const assistant: IAssistant = req.body.assistant;
        const message: IMessage = req.body.message;

        try {

            // Generate chat response from Assistant
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: EWriterRole.SYSTEM, content: assistant.biography  },
                    { role: EWriterRole.USER, content: message.content  }
                ],
                model: "gpt-3.5-turbo",
            });

            if (!completion || !completion.choices || completion.choices.length === 0 || !completion.choices[0].message.content) {
                return res.status(500).json({ message: "Error during getting the OpenAI response" });
            }

            // Find or Create the conversation
            const update = { userId, assistantId: assistant._id };
            const conversation = await Conversation.findOneAndUpdate({ userId, assistantId: assistant._id }, update, { upsert: true, new: true, setDefaultsOnInsert: true });

            if (!conversation) {
                return res.status(500).json({ message: "An error occured during finding or creating the conversation" });
            }

            // Insert the new messages in conversation
            const userMessage: IMessage = new Message({ senderRole: EWriterRole.USER, content: message.content, conversationId: conversation._id });
            const assistantMessage: IMessage = new Message({ senderRole: EWriterRole.ASSISTANT, content: completion.choices[0].message.content, conversationId: conversation._id });
            await Message.insertMany([userMessage, assistantMessage], { ordered: true }); // Prevent additional documents from being inserted if one fails


            // Only send the assistant response
            res.status(200).send(assistantMessage);

        } catch (error) {
            console.error(`error during creating the new message =>  : ${error}`);
            return res.status(500).json({ message: "Error during the message creation" });
        }

    }

}