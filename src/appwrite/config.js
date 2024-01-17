import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import authServices from "./auth.js";

class Services {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.bucket = new Storage(this.client);
    this.database = new Databases(this.client);
  }
  // { title, content, featuredImage, status, userID, slug }
  async createPost({ content, featuredImage, slug, status, title, userId }) {
    try {
      return await this.database.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("appwrite > config > createPost > ERROR", error);
    }
  }

  async uploadImage(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("appwrite > config > uploadImage > ERROR", error);
    }
  }
  async getImage(id) {
    try {
      return await this.bucket.getFileDownload(conf.appWriteBucketId, id);
    } catch (error) {
      console.log("appwrite > config > getImage > ERROR", error);
    }
  }
  async getAllPost() {
    try {
      return await this.database.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        [Query.equal("status", "enable")]
      );
    } catch (error) {
      console.log("appwrite > config > getAllPost > ERROR", error);
    }
  }
  async getPost(id) {
    try {
      return await this.database.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        id
      );
    } catch (error) {
      console.log("appwrite > config > getAllPost > ERROR", error);
    }
  }

  async updatePost(id, data, imageId) {
    console.log("conf", id, data, imageId);
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        id,
        {
          "title": data.title,
          "content": data.content,
          "featuredImage": imageId,
        }
      );
    } catch (error) {
      console.log("appwrite > config > updateDocument > ERROR", error);
    }
  }
  async deleteImage(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
    } catch (error) {
      console.log("appwrite > config > deleteImage > ERROR", error);
    }
  }
  async deletePost(id) {
    try {
      return await this.database.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        id
      );
    } catch (error) {
      console.log("appwrite > config > deletePost > ERROR", error);
    }
  }
}
const services = new Services();

export default services;
