import "server-only";

import mongoose, { Document, Model } from "mongoose";

// Interface for user document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Make password optional
  image?: string;
  authType: string;
  provider?: string;
  bookmarks: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String, // Make password optional
    image: String,
    authType: {
      type: String,
      required: true,
    },
    provider: String,
    bookmarks: {
      // array of mal id
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create the model with type safety
const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
