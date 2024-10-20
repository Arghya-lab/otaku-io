import "server-only";

import mongoose, { Document, Model } from "mongoose";

// Interface for preference document
interface IPreference extends Document {
  userId: mongoose.Types.ObjectId;
  email: string;
  isDub: boolean;
  autoPlay: boolean;
  autoNext: boolean;
  seekSeconds: number;
  bookmarks: string[];
  autoSkip: boolean;
  playbackQuality: "360p" | "480p" | "720p" | "1080p";
  createdAt: Date;
  updatedAt: Date;
}

const preferenceSchema = new mongoose.Schema<IPreference>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isDub: {
      type: Boolean,
      default: false,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    autoNext: {
      type: Boolean,
      default: false,
    },
    autoSkip: {
      type: Boolean,
      default: false,
    },
    seekSeconds: {
      type: Number,
      enum: [5, 10, 15, 20],
      default: 10,
    },
    playbackQuality: {
      type: String,
      enum: ["360p", "480p", "720p", "1080p"],
      default: "360p",
    },
  },
  { timestamps: true }
);

// Export the model
const Preference =
  (mongoose.models.Preference as Model<IPreference>) ||
  mongoose.model<IPreference>("Preference", preferenceSchema);

export default Preference;
