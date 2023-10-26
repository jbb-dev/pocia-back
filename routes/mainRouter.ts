import express, { Router } from 'express';
const mainRouter: Router = express.Router();

import { mainController } from '../controllers/mainController';

mainRouter
    .get("/chat", mainController.getConversation)
    .post("/chat", mainController.chatWithAssistant)

export default mainRouter;