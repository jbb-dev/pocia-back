import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import mainRouter from './routes/mainRouter';
import userRouter from './routes/userRouter';

const app: Express = express();
const MAIN_PORT = process.env.PORT;
const DB_URL = process.env.DEV_DB_CONNECTION_URL as string;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// DB Connection function
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URL);
    console.log('MongoDB successfully connected');
  } catch (err : any) {
    console.error(err.message);
    process.exit(1);
  }
};

// Running connection
connectDB();

// Routes
app.get('/', (req: Request, res: Response) => res.send('home main server'));
app.use('/api', mainRouter);
app.use('/api/user', userRouter);


// Listen server
app.listen(MAIN_PORT, () => console.log(`Main server listening on port ${MAIN_PORT}`));