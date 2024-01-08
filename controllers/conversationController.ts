import { Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

import { EWriterRole, IMessage, Message } from '../models/Message';
import { Conversation, IConversation } from '../models/Conversation';
import { IUserTokenPayload, RequestWithPayload } from '../middlewares/authenticate';

export const conversationController = {

    getOneConversation: async function (req: RequestWithPayload, res: Response) {

        const { userId } = req.payload as IUserTokenPayload;
        console.log("req body => ", req.body)  
        const assistantId = '653a2ee5bcce51a33028e684';

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
        const { content } = req.body;

        console.log('chat with assistant, body => ', content)

        const additionnal = "Write the response using “markdown format and answer in French ”"
        const assistantId = '653a2ee5bcce51a33028e684';

        console.log('content => ', content)

        // Generate chat response from Assistant
        const completion = await openai.chat.completions.create({
            messages: [
                { role: EWriterRole.SYSTEM, content: additionnal  },
                { role: EWriterRole.USER, content: content  }
            ],
            model: "gpt-3.5-turbo",
        });
        console.log('GPT COMPLETION ====> ', completion.choices[0].message.content)

        // Find or Create the conversation
        try {
            const update = { userId, assistantId };
            const conversation = await Conversation.findOneAndUpdate({ userId, assistantId }, update, { upsert: true, new: true, setDefaultsOnInsert: true });

            // Insert the new messages in conversation
            const options = { ordered: true }; // Prevent additional documents from being inserted if one fails

            try 
            {
                const userMessage: IMessage = new Message({ senderRole: EWriterRole.USER, content: content, conversationId: conversation._id });
                const assistantMessage: IMessage = new Message({ senderRole: EWriterRole.ASSISTANT, content: completion.choices[0].message.content, conversationId: conversation._id });
                
                // Save the two messages
                const newMessages: IMessage[] = [userMessage, assistantMessage];
                await Message.insertMany(newMessages, options);

                // Only send the assistant response
                res.status(200).send(assistantMessage);
            } 
            catch (error) {
                console.log(`An error occured during insert of new Conversation :${error}`);
                return res.status(500);
            }
            
        } catch (error) {
            console.log(`An error occured during upserting conversation :${error}`);
            return res.status(500);
        }
    }

}