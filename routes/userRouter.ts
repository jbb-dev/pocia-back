import express, { Router } from 'express';
const userRouter: Router = express.Router();
import { userController } from './../controllers/userController';


userRouter
    .post("/create", userController.createNewUser)

export default userRouter;