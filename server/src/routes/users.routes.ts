import {Router} from "express";
import {get, login, register, userLogout, userChangePassword} from "../controller/users.controller";
export const userRouter   = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post("/get", get)
userRouter.post('/logout', userLogout);
userRouter.patch('/update-pwsd', userChangePassword);

