import { Schema, model, Model } from 'mongoose';

// Create an interface representing a document in MongoDB.
export interface IAssistant {
    name: string;
    job: string;
    biography: string;
    avatar: string;
}

// Create a new model with statics methods:
interface IAssistantModel extends Model<IAssistant> {
    createAssistant(newAssistant: IAssistant): Promise<IAssistant>;
    getAssistants(): Promise<IAssistant[]>;
}

// Create a Schema corresponding to the document interface.
const assistantSchema = new Schema<IAssistant, IAssistantModel>({
    name: { type: String, required: true },
    biography: { type: String, required: true },
    avatar: { type: String, required: true },
    job: { type: String, required: true },
});

// Add statics methods:

// Create new assistant
assistantSchema.statics.createAssistant = async function (assistant: IAssistant): Promise<IAssistant> {
    return this.create(assistant);
};

// Get All assistants
assistantSchema.statics.getAssistants = async function () {
    return this.find();
};

// Create and export Model.
export const Assistant = model<IAssistant, IAssistantModel>('Assistant', assistantSchema);