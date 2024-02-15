import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { chats } from "./dummydata/data";
import path from "path";
import { connectDB } from "../configs/db";
import userRoutes from "./routes/userRoutes";
import { uservalidator } from "./middlewares/usersValidator";
import { handlemiddleware } from "./middlewares/errormiddleware";
import { registerUser } from "./controller/userController";

const envFilePath = path.resolve(
  __dirname,
  "..",
  "configs",
  `.env.${process.env.NODE_ENV}`
);
const fallbackEnvFilePath = path.resolve(__dirname, "..", "configs", ".env");
require("dotenv").config({ path: envFilePath || fallbackEnvFilePath });

connectDB();

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/users", userRoutes);
app.use((req, res, next) => {
  const error = new Error(`route not found ${req.originalUrl}`);
  next(error);
});
app.use(handlemiddleware);
const server = http.createServer(app);
server.listen(process.env.HTTP_PORT || 5000, () => {
  console.log(`server running on port ${process.env.HTTP_PORT || 5000}`);
});
