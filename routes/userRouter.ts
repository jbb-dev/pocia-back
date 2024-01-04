import express, { Router } from 'express';
const userRouter: Router = express.Router();
import { userController } from './../controllers/userController';


userRouter
    .post("/subscribe", userController.subcribe)
    .post("/login", userController.login)


export default userRouter;