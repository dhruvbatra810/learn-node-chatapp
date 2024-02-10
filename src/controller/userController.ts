import { User } from "../models/userModel";
import { generateToken } from "../middlewares/middleware";
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, pic } = req.body;
    const userExsist = await User.find({ email });
    console.log(userExsist);
    if (userExsist.length) {
      res.status(400);
      throw new Error("user already exsists");
    }
    const user: any = await User.create({ name, email, password, pic });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    }
    else
    throw new Error("failed to create user");
  } catch (error) {
    next(error);
  }
};
export const login =async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic
      });
    }
  } catch (error) {
    next(error);
  }
};
