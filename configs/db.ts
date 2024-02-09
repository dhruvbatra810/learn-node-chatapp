import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect((process as any).env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
