/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import { connectDB } from "../configs/db";
import userRoutes from "./routes/userRoutes";
import chatsRouter from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import { handlemiddleware } from "./middlewares/errormiddleware";

const envFilePath = path.resolve(
  __dirname,
  "..",
  "configs",
  `.env.${process.env.NODE_ENV}`,
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
app.use("/chats", chatsRouter);
app.use("/messages", messageRoutes);
app.use((req, res, next) => {
  const error = new Error(`route not found ${req.originalUrl}`);
  next(error);
});
app.use(handlemiddleware);
const server = http.createServer(app);
server.listen(process.env.HTTP_PORT || 5000, () => {
  console.log(`server running on port ${process.env.HTTP_PORT || 5000}`);
});
const io = new Server(server, {
  pingTimeout: 30000,
  cors: { origin: "http://localhost:3000" },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("new message", (newMessageRecieved) => {
    const { chat } = newMessageRecieved;
    if (!chat.users) return console.log("chat.user not defined!!");
    chat.users.forEach((user) => {
      console.log("user", user);
      if (user !== newMessageRecieved.sender._id) {
        console.log("is it emiting", user, newMessageRecieved);
        socket.in(user).emit("message recieved", newMessageRecieved);
      }
    });
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });
  socket.off("setup", (userData) => {
    socket.leave(userData._id);
  });
});
