var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const Message = require('./../models/Message');
module.exports = {
    getConversation: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = [{ "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": "Who won the world series in 2020?" },
                { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
                { "role": "user", "content": "Where was it played?" }
            ];
            res.status(200).send(conversation);
        });
    },
    chatWithAssistant: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role, content } = req.body;
            console.log('message => ', req.body);
            const completion = yield openai.chat.completions.create({
                messages: [{ role: "user", content }],
                // messages: [{"role": "system", "content": "You are a helpful assistant."},
                // {"role": "user", "content": "Who won the world series in 2020?"},
                // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
                // {"role": "user", "content": "Where was it played?"}],
                model: "gpt-3.5-turbo",
            });
            // console.log("completion => ", completion);
            // console.log(completion.choices[0]);
            console.log('chat With assistant, message => ', completion.choices[0].message);
            const chatResponse = completion.choices[0].message.content;
            const newConversation = [{ role, content }, { role: 'assistant', content: chatResponse }];
            // Save the message to MongoDB
            // const message = new Message({ user: "toto", text: completion.choices[0].message.content });
            // await message.save();
            // Prevent additional documents from being inserted if one fails
            const options = { ordered: true };
            // Execute insert operation
            try {
                yield Message.insertMany(newConversation, options);
                return res.status(200).send(completion.choices[0].message);
            }
            catch (error) {
                console.log(`An error occured during insert of new Conversation :${error}`);
                return res.status(500);
            }
            ;
        });
    }
};
//# sourceMappingURL=mainController.js.map