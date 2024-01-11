import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import "./db_config/mongo";

import conversationRouter from './routes/conversationRouter';
import userRouter from './routes/userRouter';
import assistantRouter from './routes/assistantRouter';

const app: Express = express();
const MAIN_PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Routes
app.get('/', (req: Request, res: Response) => res.send('home main server'));
app.use('/api', conversationRouter);
app.use('/api/user', userRouter);
app.use('/api/assistant', assistantRouter);


// Listen server
app.listen(MAIN_PORT, () => console.log(`🌈 Main server listening on port ${MAIN_PORT}`));