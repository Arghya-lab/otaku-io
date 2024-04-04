import mongoose from "mongoose";

export let isMongoConnected = false;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected 🎈");
      isMongoConnected = true;
    });
    connection.on("error", (err) => {
      console.error(
        "MongoDB connection error. Plz make sure mongodb is up & running:",
        err
      );
      process.exit();
    });

    mongoose.Promise = global.Promise;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
