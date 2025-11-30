import { MongoClient, ObjectId } from 'mongodb';
import Logger from './logger.js';

class Database {
  constructor() {
    this.client = null;
    this.db = null;
    this.url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
    this.dbName = process.env.MONGO_DB || 'motor_de_busca';
  }

  async connect() {
    if (this.db) {
      return this.db;
    }

    try {
      this.client = new MongoClient(this.url);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      return this.db;
    } catch (error) {
      Logger.logError('Falha ao conectar no MongoDB', error);
      throw error;
    }
  }

  getCollection(name) {
    if (!this.db) {
      throw new Error('Banco não conectado. Execute connect() antes.');
    }
    return this.db.collection(name);
  }

  objectId(id) {
    return new ObjectId(id);
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

export default new Database();
