import { Client, Databases, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
      .setEndpoint(import.meta.env.VITE_APPWRITE_END_POINT);
    this.databases = new Databases(this.client);
  }

  async userPreferences() {
    try {
      return this.databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        "<COLLECTION_ID>",
        ID.unique(),
        { title: "Hamlet" }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

const service = new Service();
export default service;
