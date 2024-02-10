import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect((process as any).env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
  } catch (error: any) {
    process.exit();
  }
};
