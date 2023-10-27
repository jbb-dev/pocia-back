import { Schema, Types, Model, model } from 'mongoose';

export interface IConversation {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    assistantId: Types.ObjectId;
}

// Create a new model with statics methods:
interface IConversationModel extends Model<IConversation> {
    createConversation(userId:Types.ObjectId, assistantId: Types.ObjectId): Promise<IConversation>;
    findConversation(userId:Types.ObjectId, assistantId: Types.ObjectId): Promise<IConversation>;
}


const conversationSchema = new Schema<IConversation, IConversationModel>({
    userId: Types.ObjectId,
    assistantId: Types.ObjectId,
});

// Add statics methods:

// Create new conversation
conversationSchema.statics.createConversation = async function (userId:Types.ObjectId, assistantId: Types.ObjectId): Promise<IConversation> {
    return this.create({userId, assistantId});
};

// Find conversation
conversationSchema.statics.findConversation = async function (userId:Types.ObjectId, assistantId: Types.ObjectId): Promise<IConversation | null> {
    return this.findOne({userId, assistantId})
};


export const Conversation = model<IConversation, IConversationModel>('Conversation', conversationSchema);
