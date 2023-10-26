import express, { Router } from 'express';
const adminRouter: Router = express.Router();
import { adminController } from './../controllers/adminController';


adminRouter
    .get("/users", adminController.getUsers)

export default adminRouter;