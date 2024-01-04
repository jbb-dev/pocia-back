import express, { Router } from 'express';
const userRouter: Router = express.Router();
import { userController } from './../controllers/userController';
import { loginValidator } from './../validators/userValidator';
import { validateMandatoryFields } from '../middlewares/validator';

userRouter
    .post("/subscribe", userController.subcribe)
    .post("/login", loginValidator(), validateMandatoryFields, userController.login)

export default userRouter;