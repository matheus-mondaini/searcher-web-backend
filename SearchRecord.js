import database from './database.js';
import Logger from './logger.js';

class SearchRecord {
  static collectionName = 'searches';

  static async create(data) {
    try {
      const db = database.getCollection(this.collectionName);
      const payload = {
        query: data.query.toLowerCase(),
        resultsCount: data.resultsCount ?? 0,
        executedAt: new Date(),
        metadata: data.metadata ?? {}
      };
      const result = await db.insertOne(payload);
      return { _id: result.insertedId, ...payload };
    } catch (error) {
      Logger.logError('Erro ao registrar busca', error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const db = database.getCollection(this.collectionName);
      return db.find({}).toArray();
    } catch (error) {
      Logger.logError('Erro ao listar buscas', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const db = database.getCollection(this.collectionName);
      return db.findOne({ _id: database.objectId(id) });
    } catch (error) {
      Logger.logError('Erro ao buscar registro de busca por ID', error);
      throw error;
    }
  }

  static async update(id, updates) {
    try {
      const db = database.getCollection(this.collectionName);
      const payload = {
        ...updates,
        executedAt: updates.executedAt ?? new Date()
      };
      if (payload.query) {
        payload.query = payload.query.toLowerCase();
      }
      const result = await db.updateOne(
        { _id: database.objectId(id) },
        { $set: payload }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      Logger.logError('Erro ao atualizar registro de busca', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const db = database.getCollection(this.collectionName);
      const result = await db.deleteOne({ _id: database.objectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      Logger.logError('Erro ao deletar registro de busca', error);
      throw error;
    }
  }
}

export default SearchRecord;
