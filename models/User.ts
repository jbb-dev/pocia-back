import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
})

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

//   const userSchema = new mongoose.Schema({
//     user: String,
//     text: String,
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
//     },
//     updatedAt: { 
//         type: Date, 
//         default: Date.now 
//     },
// });

// const User = mongoose.model('User', userSchema);

module.exports = User;