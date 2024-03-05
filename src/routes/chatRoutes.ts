import express from "express";
import { authenticate } from "../middlewares/authmiddleware";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "../controller/chatController";

const router = express.Router();

router.use(authenticate);
router.route("/").post(accessChat).get(fetchChats);
router.route("/group").post(createGroupChat).put(renameGroup);
router.route("/groupremove").put(removeFromGroup);
router.route("/groupadd").put(addToGroup);
export default router;
