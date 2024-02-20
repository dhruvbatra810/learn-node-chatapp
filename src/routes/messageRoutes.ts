import express from "express";
import { authenticate } from "../middlewares/authmiddleware";
import { allMessages, sendMessage } from "../controller/messageController";
import { Message } from "../models/messageModels";
const router = express.Router();

router.use(authenticate);
router.route("/").post(sendMessage);
router.route("/:chatId").get(allMessages);
export default router;
