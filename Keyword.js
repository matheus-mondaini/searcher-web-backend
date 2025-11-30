import database from './database.js';
import Logger from './logger.js';

class Keyword {
  static collectionName = 'keywords';

  static async create(data) {
    try {
      const db = database.getCollection(this.collectionName);
      const payload = {
        word: data.word.toLowerCase(),
        relatedWebsites: data.relatedWebsites ?? [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const result = await db.insertOne(payload);
      return { _id: result.insertedId, ...payload };
    } catch (error) {
      Logger.logError('Erro ao criar Keyword', error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const db = database.getCollection(this.collectionName);
      return db.find({}).toArray();
    } catch (error) {
      Logger.logError('Erro ao listar Keywords', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const db = database.getCollection(this.collectionName);
      return db.findOne({ _id: database.objectId(id) });
    } catch (error) {
      Logger.logError('Erro ao buscar Keyword por ID', error);
      throw error;
    }
  }

  static async update(id, updates) {
    try {
      const db = database.getCollection(this.collectionName);
      const payload = {
        ...updates,
        updatedAt: new Date()
      };
      if (payload.word) {
        payload.word = payload.word.toLowerCase();
      }
      const result = await db.updateOne(
        { _id: database.objectId(id) },
        { $set: payload }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      Logger.logError('Erro ao atualizar Keyword', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const db = database.getCollection(this.collectionName);
      const result = await db.deleteOne({ _id: database.objectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      Logger.logError('Erro ao deletar Keyword', error);
      throw error;
    }
  }
}

export default Keyword;
