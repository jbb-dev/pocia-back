import express, { Router } from 'express';
const userRouter: Router = express.Router();
import { userController } from './../controllers/userController';
import { loginValidator, subscribeValidator, updateProfileValidator } from './../validators/userValidator';
import { validateMandatoryFields } from '../middlewares/validator';
import { authenticateUser } from '../middlewares/authenticate';

userRouter
    // PUBLIC ROUTES
    .post("/login", loginValidator(), validateMandatoryFields, userController.login)
    .post("/profile", subscribeValidator(), validateMandatoryFields, userController.subcribe)

    // PRIVATE ROUTES
    .put("/profile", authenticateUser, updateProfileValidator(), validateMandatoryFields, userController.updateProfile)

export default userRouter;