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

  // async setWatching(userId, { animeId, episodeNo} ){

  // }

  async setWatchedTill(userId, { animeId, episodeNo, watchedTill = 0 }) {
    const listedEp = await this.databases.listDocuments(
      conf.appwriteDbId,
      conf.appwriteWatchedCollectionId,
      [
        Query.equal("userId", userId),
        Query.equal("animeId", animeId),
        Query.equal("episodeNo", episodeNo),
      ]
    );
    if (listedEp.total != 0) {
      // if a particular anime's ep already present then update watchTill only
      if (listedEp.documents[0].watchedTill < watchedTill) {
        await this.databases.updateDocument(
          conf.appwriteDbId,
          conf.appwriteWatchedCollectionId,
          listedEp.documents[0].$id,
          { watchedTill }
        );
      }
    } else {
      // initiate ep
      await this.databases.createDocument(
        conf.appwriteDbId,
        conf.appwriteWatchedCollectionId,
        ID.unique(),
        { userId, animeId, episodeNo, watchedTill }
      );
    }
  }

  async getWatchedTill(userId, { animeId, episodeNo }) {
    const data = await this.databases.listDocuments(
      conf.appwriteDbId,
      conf.appwriteWatchedCollectionId,
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
      conf.appwriteWatchedCollectionId,
      [Query.equal("userId", userId), Query.equal("animeId", animeId)]
    );
    if (data.total != 0) {
      return data.documents.map((epInfo) => epInfo.episodeNo);
    }
    return [];
  }

  // async getWatchingAnimeList(userId) {
  //   const data = await this.databases.listDocuments(
  //     conf.appwriteDbId,
  //     conf.appwriteWatchedCollectionId,
  //     [
  //       Query.equal("userId", userId),
  //     ]
  //   );
  //   if (data.total != 0) {
  //     // return data.documents
  //     console.log(data.documents);
  //   }
  //   // return null;
  //   console.log(null);
  // }
}

const watched = new Watched();
export default watched;
