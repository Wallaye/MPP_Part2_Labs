import {Router} from "express";
import * as AuthController from "../controllers/authController.js";
import {body} from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = new Router();

authRouter.post('/registration',
    body('userName').isLength({min: 3, max: 20}).notEmpty({ignore_whitespace: true}),
    body('password').isLength({min: 3, max: 30}),
    AuthController.registration);
authRouter.post('/login', AuthController.login);
authRouter.post('/logout', AuthController.logout);
authRouter.get('/refresh', AuthController.refresh);

export default authRouter;