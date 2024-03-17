import mongoose from "mongoose";

export let isMongoConnected = false;

const connectDB = async () => {
  try {
      await mongoose.connect(String(process.env.MONGODB_URI)).then(() => {
      console.log("MongoDB Connected 🎈");
      isMongoConnected = true;
    });
    mongoose.Promise = global.Promise;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
