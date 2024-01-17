import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
  }

  async signup({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login(email, password);
      } else {
        return null;
      }
    } catch (error) {
      console.log("appwrite > auth > signup > ERROR", error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const userAccount = await this.account.createEmailSession(
        email,
        password
      );

      if (userAccount) {
        return this.getAccount();
      } else {
        return null;
      }
    } catch (error) {
      console.log("appwrite > auth > login > ERROR", error);
      throw error;
    }
  }

  async getAccount() {
    try {
      const userData = await this.account.get();
      return userData;
    } catch (error) {
      console.log("appwrite > auth > getAccount > ERROR", error);
      throw error;
    }
  }
}

const authServices = new AuthService();
export default authServices;
