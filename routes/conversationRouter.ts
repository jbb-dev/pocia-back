import express, { Router } from 'express';
const conversationRouter: Router = express.Router();

import { conversationController } from '../controllers/conversationController';
import { authenticateUser } from '../middlewares/authenticate';

conversationRouter
    .get("/conversation/:assistantId", authenticateUser, conversationController.getOneConversation)
    .post("/chat", authenticateUser, conversationController.chatWithAssistant)

export default conversationRouter;