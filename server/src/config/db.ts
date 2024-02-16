import mongoose from "mongoose";

const dbUrl: string = process.env.MONGODB_URI || "";

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`DATABASE CONNECTED WITH ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};
