import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class Watched {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setProject(conf.appwriteProjectId)
      .setEndpoint(conf.appwriteEndPoint);
    this.databases = new Databases(this.client);
  }

  async setAnimeWatching(userId, { animeId, episodeNo = 1 }) {
    const listedAnime = await this.databases.listDocuments(
      conf.appwriteDbId,
      conf.appwriteAnimeWatchingCollectionId,
      [Query.equal("userId", userId), Query.equal("animeId", animeId)]
    );
    if (listedAnime.total != 0) {
      // if a particular anime already present then update episode only
      await this.databases.updateDocument(
        conf.appwriteDbId,
        conf.appwriteAnimeWatchingCollectionId,
        listedAnime.documents[0].$id,
        { episodeNo }
      );
    } else {
      // initiate ep
      await this.databases.createDocument(
        conf.appwriteDbId,
        conf.appwriteAnimeWatchingCollectionId,
        ID.unique(),
        { userId, animeId, episodeNo }
      );
    }
  }

  async setWatchedTill(userId, { animeId, episodeNo, watchedTill = 0 }) {
    const listedEp = await this.databases.listDocuments(
      conf.appwriteDbId,
      conf.appwriteWatchedEpCollectionId,
      [
        Query.equal("userId", userId),
        Query.equal("animeId", animeId),
        Query.equal("episodeNo", episodeNo),
      ]
    );
    if (listedEp.total != 0) {
      // if a particular anime's ep already present then update watchTill only
      await this.databases.updateDocument(
        conf.appwriteDbId,
        conf.appwriteWatchedEpCollectionId,
        listedEp.documents[0].$id,
        { watchedTill }
      );
    } else {
      // set the anime as watching
      await this.setAnimeWatching(userId, { animeId, episodeNo });
      // initiate ep
      await this.databases.createDocument(
        conf.appwriteDbId,
        conf.appwriteWatchedEpCollectionId,
        ID.unique(),
        { userId, animeId, episodeNo, watchedTill }
      );
    }
  }

  async getWatchedTill(userId, { animeId, episodeNo }) {
    const data = await this.databases.listDocuments(
      conf.appwriteDbId,
      conf.appwriteWatchedEpCollectionId,
      [
        Query.equal("userId", userId),
        Query.equal("animeId", animeId),
        Query.equal("episodeNo", episodeNo),
      ]
    );
    if (data.total != 0) {
      return data.documents[0].watchedTill;
    }
    return null;
  }

  async getAnimeWatchedEps(userId, animeId) {
    const data = await this.databases.listDocuments(
      conf.appwriteDbId,
      conf.appwriteWatchedEpCollectionId,
      [Query.equal("userId", userId), Query.equal("animeId", animeId)]
    );
    if (data.total != 0) {
      return data.documents.map((epInfo) => epInfo.episodeNo);
    }
    return [];
  }

  async getWatchingAnimeList(userId) {
    const data = await this.databases.listDocuments(
      conf.appwriteDbId,
      conf.appwriteAnimeWatchingCollectionId,
      [Query.equal("userId", userId), Query.orderDesc("$updatedAt")],
      Query.limit(10),
      Query.offset(0)
    );
    if (data.total != 0) {
      return data.documents;
    }
    return [];
  }
}

const watched = new Watched();
export default watched;
