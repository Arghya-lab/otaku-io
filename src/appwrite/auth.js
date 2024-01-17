import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
      .setEndpoint(import.meta.env.VITE_APPWRITE_END_POINT);
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
      return await this.loginUser({ email, password });
    } else {
      throw new Error("Error occurred while creating a new user.");
    }
  }

  async loginUser({ email, password }) {
    return await this.account.createEmailSession(email, password);
  }

  async getCurrentUser() {
    return await this.account.get();
  }

  async logoutUser() {
    await this.account.deleteSessions();
  }
}

const authService = new AuthService();

export default authService;
