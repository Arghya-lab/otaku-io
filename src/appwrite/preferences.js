import { Client, Databases, ID, Query } from "appwrite";

export class Preferences {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
      .setEndpoint(import.meta.env.VITE_APPWRITE_END_POINT);
    this.databases = new Databases(this.client);
  }

  async initializePreference(userId) {
    const data = await this.databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PREFERENCES_COLLECTION_ID,
      ID.unique(),
      { userId }
    );
    return data;
  }

  async getPreferences(userId) {
    const data = await this.databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PREFERENCES_COLLECTION_ID,
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
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PREFERENCES_COLLECTION_ID,
      preferenceId,
      { isDub: isDubEnabled }
    );
  }

  async changeTheme({ preferenceId, themeId }) {
    return await this.databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PREFERENCES_COLLECTION_ID,
      preferenceId,
      { themeId }
    );
  }

  async changeAutoPlay({ preferenceId, autoPlay }) {
    return await this.databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PREFERENCES_COLLECTION_ID,
      preferenceId,
      { autoPlay }
    );
  }

  async changeAutoNext({ preferenceId, autoNext }) {
    return await this.databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PREFERENCES_COLLECTION_ID,
      preferenceId,
      { autoNext }
    );
  }

  async changeSeekSeconds({ preferenceId, seekSeconds }) {
    return await this.databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_PREFERENCES_COLLECTION_ID,
      preferenceId,
      { seekSeconds }
    );
  }
}

const preferences = new Preferences();
export default preferences;
