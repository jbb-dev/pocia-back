import express, { Router } from 'express';
const userRouter: Router = express.Router();
import { userController } from './../controllers/userController';
import { loginValidator, credentialsValidator } from './../validators/userValidator';
import { validateMandatoryFields } from '../middlewares/validator';
import { authenticateUser } from '../middlewares/authenticate';

userRouter
    // PUBLIC ROUTES
    .post("/login", loginValidator(), validateMandatoryFields, userController.login)
    .post("/profile", credentialsValidator(), validateMandatoryFields, userController.subcribe)

    // PRIVATE ROUTes
    .put("/profile", authenticateUser, credentialsValidator(), validateMandatoryFields, userController.updateProfile)

export default userRouter;