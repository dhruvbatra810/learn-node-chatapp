import express from "express";
import { uservalidator } from "../middlewares/usersValidator";
import { registerUser, login, getAllUsers } from "../controller/userController";
import { authenticate } from "../middlewares/authmiddleware";

const router = express.Router();
router.post("/register", uservalidator, registerUser);
router.get("/allusers", authenticate, getAllUsers);
router.post("/login", login);
// router.use((req, res, next) => {
//     const error = new Error(`route not found ${req.originalUrl}`);
//     next(error);
//   });
// router.use(handlemiddleware);
export default router;
