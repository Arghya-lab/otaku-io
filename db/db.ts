import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected 🎈");
    });
    connection.on("error", (err) => {
      console.error(
        "MongoDB connection error. Plz make sure mongodb is up & running:",
        err
      );
      process.exit();
    });

    mongoose.Promise = global.Promise;
    isConnected = true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
