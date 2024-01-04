import { Model, Schema, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Create an interface representing a document in MongoDB.
export interface IUser {
    _id: Types.ObjectId;
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
    updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null>;
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
    return this.create(newUser)
};

// Update a user
userSchema.statics.updateUser = async function(userId: string, updateData: Partial<IUser>): Promise<Partial<IUser> | null> {
    // If provided, hash the new password
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return this.findByIdAndUpdate(userId, updateData, { new: true })
        .select('-password')
        .exec();
};

// Get All users
userSchema.statics.getUsers = async function () {
    return this.find();
};

// Create and export Model.
export const User = model<IUser, IUserModel>('User', userSchema);