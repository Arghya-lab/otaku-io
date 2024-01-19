const conf = {
  consumetBaseUrl: String(import.meta.env.VITE_CONSUMET_BASE_URL),
  upcomingAnimeUrl: String(import.meta.env.VITE_UPCOMING_ANIME_URL),
  ombdBaseUrl: String(import.meta.env.VITE_OMDB_BASE_URL),
  omdbApiKey: String(import.meta.env.VITE_OMDB_API_KEY),
  imgBaseUrl: String(import.meta.env.VITE_IMG_BASE_URL),
  appwriteEndPoint: String(import.meta.env.VITE_APPWRITE_END_POINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDbId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwritePreferenceCollectionId: String(
    import.meta.env.VITE_APPWRITE_PREFERENCES_COLLECTION_ID
  ),
  appwriteWatchedCollectionId: String(
    import.meta.env.VITE_APPWRITE_WATCHED_COLLECTION_ID
  ),
};

export default conf;
