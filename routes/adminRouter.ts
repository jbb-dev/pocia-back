import express, { Router } from 'express';
const adminRouter: Router = express.Router();
import { adminController } from './../controllers/adminController';


adminRouter
    .post("/assistant", adminController.createNewAssistant)
    .get("/users", adminController.getUsers)

export default adminRouter;