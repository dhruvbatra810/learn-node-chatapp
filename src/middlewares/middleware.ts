import {User} from "../models/userModel"
import jwt from "jsonwebtoken";
export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// export const authorize = async (req, res, next) => {
//   try {
//     const { email, pwssword } = req.body;
//     const user =  await User.findOne({email});
//     if(user && user.){
//       req.user = { _id: user._id,
//         name: user.name,
//         email: user.email,
//         pic: user.pic
//     }
//     next()
//   }
//   } catch (error) {}
// };
