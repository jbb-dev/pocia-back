import express, { Router } from 'express';
const assistantRouter: Router = express.Router();
import { assistantController } from '../controllers/assistantController';
import { authenticateUser } from '../middlewares/authenticate';


assistantRouter
    .get("/", authenticateUser, assistantController.getAssistants)
    .post("/", authenticateUser, assistantController.createNewAssistant) // TODO : add validator

export default assistantRouter;