/* eslint-disable import/prefer-default-export */
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect((process as any).env.MONGO_URI, {} as any);
  } catch (error: any) {
    process.exit();
  }
};
