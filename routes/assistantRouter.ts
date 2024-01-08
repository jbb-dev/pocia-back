import express, { Router } from 'express';
const assistantRouter: Router = express.Router();
import { assistantController } from '../controllers/assistantController';


assistantRouter
    .post("/", assistantController.createNewAssistant)
    .get("/", assistantController.getAssistants)

export default assistantRouter;