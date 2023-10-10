import express, { Application, Request, Response, NextFunction } from "express";
import {userRouter} from './routes/users.routes';
import { productRouter } from "./routes/product.routes";
import { Server } from "http";
import dotenv from "dotenv";
import loggerMiddleware from "./middleware/logger.middleware";
import runDB from "./config/database";
import {v2 as cloudinary} from "cloudinary";
import cors from "cors";
dotenv.config();

const PORT = 8070;
const app: Application = express();

app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  loggerMiddleware(req, res, next);
});

app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.get("/", (req: Request, res: Response) => {
  res.status(201).send("<h1>Hello !</h1>");
});

app.use('/api/auth',userRouter);
app.use('/api/product',productRouter);

const server: Server = app.listen(PORT, async () => {
  await runDB();
  console.log({ Launched: `Listening on PORT ${PORT} 🚀` });
});
