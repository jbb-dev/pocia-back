import mongoose from "mongoose";

export enum EWriterRole {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM = 'system'
}

export interface IMessage {
    user: string;
    content: string;
}

const messageSchema = new mongoose.Schema<IMessage>({
    user: String,
    content: String,    
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);