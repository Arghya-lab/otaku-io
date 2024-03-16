import mongoose from "mongoose";

// Interface for AnimeWatched document
export interface AnimeWatchedType {
  email: string;
  animeId: string;
  episodes: EpisodeWatchedType[];
  lastWatched: number;
}

interface EpisodeWatchedType {
  episodeNo: number;
  watchedTill: number;
}

const episodeWatched = new mongoose.Schema<EpisodeWatchedType>({
  episodeNo: {
    type: Number,
    required: true,
  },
  watchedTill: {
    type: Number,
    default: 0,
  },
});

const animeWatchedSchema = new mongoose.Schema<AnimeWatchedType>(
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
  mongoose.models.AnimeWatched ||
  mongoose.model<AnimeWatchedType>("AnimeWatched", animeWatchedSchema);

export default AnimeWatched;
