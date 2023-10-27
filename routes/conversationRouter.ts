import express, { Router } from 'express';
const conversationRouter: Router = express.Router();

import { conversationController } from '../controllers/conversationController';

conversationRouter
    .get("/conversation", conversationController.getOneConversation)
    .post("/chat", conversationController.chatWithAssistant)

export default conversationRouter;