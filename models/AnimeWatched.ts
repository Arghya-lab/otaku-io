import "server-only";

import mongoose, { Document, Model } from "mongoose";

export interface IEpisodeWatched extends Document {
  episodeNo: number;
  watchedTill: number;
}

const episodeWatched = new mongoose.Schema<IEpisodeWatched>({
  episodeNo: {
    type: Number,
    required: true,
  },
  watchedTill: {
    type: Number,
    default: 0,
  },
});

// Interface for AnimeWatched document
export interface IAnimeWatched extends Document {
  email: string;
  animeId: string;
  episodes: IEpisodeWatched[];
  lastWatched: number;
  createdAt: Date;
  updatedAt: Date;
}

const animeWatchedSchema = new mongoose.Schema<IAnimeWatched>(
  {
    email: {
      type: String,
      required: true,
    },
    animeId: {
      type: String,
      required: true,
    },
    episodes: {
      type: [episodeWatched],
      default: [],
    },
    lastWatched: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
const AnimeWatched =
  (mongoose.models.AnimeWatched as Model<IAnimeWatched>) ||
  mongoose.model<IAnimeWatched>("AnimeWatched", animeWatchedSchema);

export default AnimeWatched;
