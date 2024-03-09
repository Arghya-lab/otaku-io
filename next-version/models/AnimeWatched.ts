import mongoose from "mongoose";

// Interface for AnimeWatched document
interface AnimeWatched {
  userId: mongoose.Types.ObjectId;
  email: string;
  animeId: string;
  episodes: EpisodeWatched[];
}

interface EpisodeWatched {
  episodeNo: number;
  watchedTill: number;
}

const episodeWatched = new mongoose.Schema<EpisodeWatched>({
  episodeNo: {
    type: Number,
    required: true,
  },
  watchedTill: {
    type: Number,
    default: 0,
  },
});

const animeWatchedSchema = new mongoose.Schema<AnimeWatched>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    animeId: {
      type: String,
      required: true,
    },
    episodes: {
      type: [episodeWatched],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
const AnimeWatched =
  mongoose.models.AnimeWatched ||
  mongoose.model<AnimeWatched>("AnimeWatched", animeWatchedSchema);

export default AnimeWatched;
