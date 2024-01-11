import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
dotenv.config();
import "./db_config/mongo";

import conversationRouter from './routes/conversationRouter';
import userRouter from './routes/userRouter';
import assistantRouter from './routes/assistantRouter';
import { terminateProcess } from './utils/functions/terminate_process';
import { globalApiRateLimiter } from './utils/security/express-rate-limit';

const CORS_OPTIONS = { exposedHeaders: [ 'Content-Range'] };

const app: Express = express();
const MAIN_PORT = process.env.PORT;

app.use(cors(CORS_OPTIONS));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(helmet());
app.disable('x-powered-by'); // Reduce Fingerprinting
app.use(globalApiRateLimiter); // prevent DDOS attacks from same IP

// Routes
app.get('/', (req: Request, res: Response) => res.send('home main server'));
app.use('/api', conversationRouter);
app.use('/api/user', userRouter);
app.use('/api/assistant', assistantRouter);


// Listen server
const server = app.listen(MAIN_PORT, () => console.log(`🌈 Main server listening on port ${MAIN_PORT}`));

// Manage uncaught errors globally
const exitHandler = terminateProcess(server, {
  coredump: false,
  timeout: 500
});

// Handle errors
process.on('uncaughtException', exitHandler(1, '!!!!!!------Unexpected Error------!!!!!!!'));
process.on('unhandledRejection', exitHandler(1, '!!!!!!------Unhandled Promise------!!!!!!'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));