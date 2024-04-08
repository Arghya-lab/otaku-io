import mongoose from "mongoose";

// Interface for preference document
interface Preference {
  userId: mongoose.Types.ObjectId;
  email: string;
  isDub: boolean;
  autoPlay: boolean;
  autoNext: boolean;
  themeId: number;
  seekSeconds: number;
  bookmarks: string[];
  autoSkip: boolean;
  playbackQuality: "360p" | "480p" | "720p" | "1080p";
}

const preferenceSchema = new mongoose.Schema<Preference>(
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
    themeId: {
      type: Number,
      min: 1,
      max: 30,
      default: 1,
    },
  },
  { timestamps: true }
);

// Export the model
const Preference =
  mongoose.models.Preference ||
  mongoose.model<Preference>("Preference", preferenceSchema);

export default Preference;
