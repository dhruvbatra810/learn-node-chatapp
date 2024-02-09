import express from "express";
import { uservalidator } from "../controller/usersValidator";
import { registerUser } from "../controller/userController";
import { handlemiddleware } from "../middlewares/errormiddleware";

const router = express.Router();
router.use(uservalidator);

router.post("/login", registerUser);
router.post("/", () => {});
router.use(handlemiddleware)
export default router;
