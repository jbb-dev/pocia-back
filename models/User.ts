import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Create an interface representing a document in MongoDB.
export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar?: string;
}

// Create a new model with statics methods:
interface IUserModel extends Model<IUser> {
    findUser(email: string): Promise<IUser>;
    createUser(user: IUser): Promise<IUser>;
    getUsers(): Promise<IUser[]>;
}

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser, IUserModel>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
}, { timestamps: true });

// Add statics methods:

// Find a user
userSchema.statics.findUser = async function(email: string): Promise<IUser | null> {
    return this.findOne({ email });
};

// Create new user
userSchema.statics.createUser = async function(user: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    return this.create(newUser);
};

// Get All users
userSchema.statics.getUsers = async function () {
    return this.find();
};

// Create and export Model.
export const User = model<IUser, IUserModel>('User', userSchema);