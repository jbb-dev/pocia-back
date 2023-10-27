import { Schema, Types, model } from 'mongoose';

export enum EWriterRole {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM = 'system'
}

export interface IMessage {
    senderRole: { type: string, enum: EWriterRole };
    content: string;
    conversationId: { type: Types.ObjectId, ref: "Conversation", required: true };
}

const messageSchema = new Schema<IMessage>({
    senderRole: String,
    content: String,
    conversationId: Types.ObjectId  
}, { timestamps: true });


export const Message = model<IMessage>('Message', messageSchema);