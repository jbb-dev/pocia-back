var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mainRouter = require('./routes/mainRouter');
const app = express();
const MAIN_PORT = process.env.PORT;
const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/pocia";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// Connection function
const connectDB = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield mongoose.connect(db, {});
        console.log('MongoDB successfully connected');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
    ;
});
// Creation of connection
connectDB();
app.get('/', (req, res) => res.send('home main server'));
app.use('/api', mainRouter);
app.listen(MAIN_PORT, () => console.log(`Main server listening on port ${MAIN_PORT}`));
//# sourceMappingURL=server.js.map