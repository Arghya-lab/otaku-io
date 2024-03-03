import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(String(process.env.MONGODB_URI));
    const newLocal = 'MongoDB Connected 🎈';
    console.log(newLocal);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;