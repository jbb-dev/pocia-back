import express, { Router } from 'express';
const userRouter: Router = express.Router();
import { userController } from './../controllers/userController';
import { loginValidator, subscribeValidator, updateProfileValidator } from './../validators/userValidator';
import { validateMandatoryFields } from '../middlewares/validator';
import { authenticateUser } from '../middlewares/authenticate';
import { loginRateLimiter } from '../utils/security/express-rate-limit';

userRouter
    // PUBLIC ROUTES
    .post("/login", loginRateLimiter, loginValidator(), validateMandatoryFields, userController.login)
    .post("/profile", subscribeValidator(), validateMandatoryFields, userController.subcribe)

    // PRIVATE ROUTES
    .put("/profile", authenticateUser, updateProfileValidator(), validateMandatoryFields, userController.updateProfile)

export default userRouter;