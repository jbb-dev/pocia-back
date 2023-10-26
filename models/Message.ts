import mongoose from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IMessage {
    user: string;
    content: string;
    email: string;
    avatar?: string;
}

const messageSchema = new mongoose.Schema({
    user: String,
    content: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

export const Message = mongoose.model('Message', messageSchema);