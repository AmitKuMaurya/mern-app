import {Router} from "express";
import {get, login, register, userLogout, userChangePassword} from "../controller/users.controller";
import { Authentication } from "../middleware/auth.middleware";
export const userRouter   = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post("/list", Authentication,get)
userRouter.post('/logout', userLogout);
userRouter.patch('/update-pswd', Authentication,userChangePassword);

