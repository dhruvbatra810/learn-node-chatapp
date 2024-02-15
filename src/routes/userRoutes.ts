import express from "express";
import { uservalidator } from "../middlewares/usersValidator";
import { registerUser, login } from "../controller/userController";
import { handlemiddleware } from "../middlewares/errormiddleware";
const router = express.Router();

router.post("/register", uservalidator, registerUser);
router.post("/login", login);
// router.use((req, res, next) => {
//     const error = new Error(`route not found ${req.originalUrl}`);
//     next(error);
//   });
// router.use(handlemiddleware);
export default router;
