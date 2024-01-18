import { Client, Account, ID } from "appwrite";
import preferences from "./preferences";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setProject(conf.appwriteProjectId)
      .setEndpoint(conf.appwriteEndPoint);
    this.account = new Account(this.client);
  }

  async createUser({ userName, email, password }) {
    const newUser = await this.account.create(
      ID.unique(),
      email,
      password,
      userName
    );
    if (newUser) {
      await preferences.initializePreference(newUser.$id);
      return await this.loginUser({ email, password });
    } else {
      throw new Error("Error occurred while creating a new user.");
    }
  }

  async loginUser({ email, password }) {
    await this.account.createEmailSession(email, password);
    return await this.getCurrentUser();
  }

  async getCurrentUser() {
    const user = await this.account.get();
    const preference = await preferences.getPreferences(user.$id);
    return { user, preference };
  }

  async logoutUser() {
    await this.account.deleteSessions();
  }
}

const authService = new AuthService();

export default authService;
