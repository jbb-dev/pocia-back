import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import mainRouter from './routes/mainRouter';

const app: Express = express();
const MAIN_PORT = process.env.PORT;

const db: string = "mongodb://localhost:27017/pocia"

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Connection function
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(db);
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

// Listen server
app.listen(MAIN_PORT, () => console.log(`Main server listening on port ${MAIN_PORT}`));