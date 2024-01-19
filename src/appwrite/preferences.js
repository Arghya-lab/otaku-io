import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class Preferences {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setProject(conf.appwriteProjectId)
      .setEndpoint(conf.appwriteEndPoint);
    this.databases = new Databases(this.client);
  }

  async initializePreference(userId) {
    const data = await this.databases.createDocument(
      conf.appwriteDbId,
      conf.appwritePreferenceCollectionId,
      ID.unique(),
      { userId }
    );
    return data;
  }

  async getPreferences(userId) {
    const data = await this.databases.listDocuments(
      conf.appwriteDbId,
      conf.appwritePreferenceCollectionId,
      [Query.equal("userId", userId)]
    );
    if (data.total === 0) {
      return null;
    } else {
      return data.documents[0];
    }
  }

  async changeLanguagePref({ preferenceId, isDubEnabled }) {
    return await this.databases.updateDocument(
      conf.appwriteDbId,
      conf.appwritePreferenceCollectionId,
      preferenceId,
      { isDub: isDubEnabled }
    );
  }

  async changeTheme({ preferenceId, themeId }) {
    return await this.databases.updateDocument(
      conf.appwriteDbId,
      conf.appwritePreferenceCollectionId,
      preferenceId,
      { themeId }
    );
  }

  async changeAutoPlay({ preferenceId, autoPlay }) {
    return await this.databases.updateDocument(
      conf.appwriteDbId,
      conf.appwritePreferenceCollectionId,
      preferenceId,
      { autoPlay }
    );
  }

  async changeAutoNext({ preferenceId, autoNext }) {
    return await this.databases.updateDocument(
      conf.appwriteDbId,
      conf.appwritePreferenceCollectionId,
      preferenceId,
      { autoNext }
    );
  }

  async changeSeekSeconds({ preferenceId, seekSeconds }) {
    return await this.databases.updateDocument(
      conf.appwriteDbId,
      conf.appwritePreferenceCollectionId,
      preferenceId,
      { seekSeconds }
    );
  }
}

const preferences = new Preferences();
export default preferences;