import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import "./db_config/mongo";

import mainRouter from './routes/mainRouter';
import userRouter from './routes/userRouter';

const app: Express = express();
const MAIN_PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Routes
app.get('/', (req: Request, res: Response) => res.send('home main server'));
app.use('/api', mainRouter);
app.use('/api/user', userRouter);


// Listen server
app.listen(MAIN_PORT, () => console.log(`Main server listening on port ${MAIN_PORT}`));