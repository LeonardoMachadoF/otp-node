import { Router } from "express";
import * as pingController from "../controllers/ping";
import * as authController from "../controllers/auth";
import * as privateController from "../controllers/private";
import { verifyJTW } from "../libs/jwt";


export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);

mainRouter.post('/auth/signin', authController.signIn);
mainRouter.post('/auth/signup', authController.signUp);

mainRouter.post('/auth/useotp', authController.useOTP);

mainRouter.get('/private', verifyJTW, privateController.test)