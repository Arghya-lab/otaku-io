import mongoose from "mongoose";

// Interface for AnimeWatched document
export interface AnimeWatchedModelType {
  email: string;
  animeId: string;
  episodes: EpisodeWatchedModelType[];
  lastWatched: number;
}

interface EpisodeWatchedModelType {
  episodeNo: number;
  watchedTill: number;
}

const episodeWatched = new mongoose.Schema<EpisodeWatchedModelType>({
  episodeNo: {
    type: Number,
    required: true,
  },
  watchedTill: {
    type: Number,
    default: 0,
  },
});

const animeWatchedSchema = new mongoose.Schema<AnimeWatchedModelType>(
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
  mongoose.model<AnimeWatchedModelType>("AnimeWatched", animeWatchedSchema);

export default AnimeWatched;
