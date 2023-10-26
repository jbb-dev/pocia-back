import { Model, Schema, model } from 'mongoose';

// Create an interface representing a document in MongoDB.
export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    avatar?: string;
}

// Create a new model with statics methods:
interface IUserModel extends Model<IUser> {
    createUser(user: IUser): Promise<IUser>;
}

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser, IUserModel>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
})

// Add statics methods
userSchema.statics.createUser = async function (user: IUser): Promise<IUser> {
    return this.create(user);
};

// Create and export Model.
export const User = model<IUser, IUserModel>('User', userSchema);