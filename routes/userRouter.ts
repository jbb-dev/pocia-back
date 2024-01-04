import express, { Router } from 'express';
const userRouter: Router = express.Router();
import { userController } from './../controllers/userController';
import { loginValidator, credentialsValidator } from './../validators/userValidator';
import { validateMandatoryFields } from '../middlewares/validator';

userRouter
    .post("/login", loginValidator(), validateMandatoryFields, userController.login)
    .post("/profile", credentialsValidator(), validateMandatoryFields, userController.subcribe)
    .put("/profile", credentialsValidator(), validateMandatoryFields, userController.updateProfile)

export default userRouter;