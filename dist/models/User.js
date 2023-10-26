"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
});
// 3. Create a Model.
const User = (0, mongoose_1.model)('User', userSchema);
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
//# sourceMappingURL=User.js.map