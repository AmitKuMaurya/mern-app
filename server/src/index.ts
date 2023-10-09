import express, { Application, Request, Response, NextFunction } from "express";
import {userRouter} from './routes/users.route';
import { Server } from "http";
import loggerMiddleware from "./middleware/logger.middleware";
import runDB from "./config/database";
import {v2 as cloudinary} from "cloudinary";

const PORT = 8070;
const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  loggerMiddleware(req, res, next);
});

app.use(express.json());

// cloudinary.config({
//   cloud_name : process.env.CLOUDINARY_NAME,
//   api_key : process.env.CLOUDINARY_API_KEY,
//   api_secret : process.env.CLOUDINARY_API_SECRET
// });

app.get("/", (req: Request, res: Response) => {
  res.status(201).send("<h1>Hello !</h1>");
});

app.use('/api/auth',userRouter);

const server: Server = app.listen(PORT, async () => {
  await runDB;
  console.log({ Launched: `Listening on PORT ${PORT} 🚀` });
});
