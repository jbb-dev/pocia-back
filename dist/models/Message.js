"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageSchema = new mongoose.Schema({
    user: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
//# sourceMappingURL=Message.js.map