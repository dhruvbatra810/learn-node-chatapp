import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

export const authenticate = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401);
      throw new Error("user not authenticated");
    }
  } catch (error) {
    next(error);
  }
};
