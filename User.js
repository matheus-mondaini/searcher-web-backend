import database from './database.js';
import Logger from './logger.js';
import bcrypt from 'bcryptjs';

class User {
  static collectionName = 'users';

  static async create(data) {
    try {
      const db = database.getCollection(this.collectionName);

      const existingUser = await db.findOne({
        $or: [
          { username: data.username },
          { email: data.email }
        ]
      });

      if (existingUser) {
        if (existingUser.username === data.username) {
          throw new Error('Nome de usuário já está em uso');
        }
        if (existingUser.email === data.email) {
          throw new Error('Email já está cadastrado');
        }
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const payload = {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        name: data.name,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await db.insertOne(payload);
      
      const { password, ...userWithoutPassword } = payload;
      return { _id: result.insertedId, ...userWithoutPassword };
    } catch (error) {
      Logger.logError('Erro ao criar usuário', error);
      throw error;
    }
  }

  static async authenticate(username, password) {
    try {
      const db = database.getCollection(this.collectionName);

      const user = await db.findOne({
        $or: [
          { username: username },
          { email: username }
        ]
      });

      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      Logger.logError('Erro ao autenticar usuário', error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const db = database.getCollection(this.collectionName);
      const users = await db.find({}).toArray();
      
      return users.map(({ password, ...user }) => user);
    } catch (error) {
      Logger.logError('Erro ao listar usuários', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const db = database.getCollection(this.collectionName);
      const user = await db.findOne({ _id: database.objectId(id) });
      
      if (!user) {
        return null;
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      Logger.logError('Erro ao buscar usuário por ID', error);
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      const db = database.getCollection(this.collectionName);
      const user = await db.findOne({ username });
      
      if (!user) {
        return null;
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      Logger.logError('Erro ao buscar usuário por username', error);
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

      if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10);
      }

      const result = await db.updateOne(
        { _id: database.objectId(id) },
        { $set: payload }
      );

      return result.modifiedCount > 0;
    } catch (error) {
      Logger.logError('Erro ao atualizar usuário', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const db = database.getCollection(this.collectionName);
      const result = await db.deleteOne({ _id: database.objectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      Logger.logError('Erro ao deletar usuário', error);
      throw error;
    }
  }

  static async createIndexes() {
    try {
      const db = database.getCollection(this.collectionName);
      await db.createIndex({ username: 1 }, { unique: true });
      await db.createIndex({ email: 1 }, { unique: true });
    } catch (error) {
      Logger.logError('Erro ao criar índices de usuário', error);
      throw error;
    }
  }
}

export default User;
