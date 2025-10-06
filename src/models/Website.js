import database from '../database/connection.js';
import { ObjectId } from 'mongodb';

/**
 * Classe Website - Representa um website indexado no sistema
 * Implementa métodos CRUD para manipulação de websites no MongoDB
 */
class Website {
  constructor(data = {}) {
    this.url = data.url || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.keywords = data.keywords || [];
    this.content = data.content || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.clicks = data.clicks || 0;
  }

  /**
   * Retorna a coleção de websites do MongoDB
   * @returns {Collection} Coleção de websites
   */
  static getCollection() {
    const db = database.getDb();
    return db.collection('websites');
  }

  /**
   * Insere um novo website no banco de dados
   * @returns {Promise<Object>} Website inserido
   */
  async insert() {
    try {
      const collection = Website.getCollection();
      
      // Verifica se a URL já existe
      const exists = await collection.findOne({ url: this.url });
      if (exists) {
        throw new Error('URL já cadastrada no sistema');
      }

      const result = await collection.insertOne({
        url: this.url,
        title: this.title,
        description: this.description,
        keywords: this.keywords.map(k => k.toLowerCase()),
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        clicks: this.clicks
      });

      return { _id: result.insertedId, ...this };
    } catch (error) {
      console.error('Erro ao inserir website:', error);
      throw error;
    }
  }

  /**
   * Busca websites por palavra-chave
   * @param {string} keyword - Palavra-chave para busca
   * @returns {Promise<Array>} Lista de websites encontrados
   */
  static async findByKeyword(keyword) {
    try {
      const collection = Website.getCollection();
      const searchTerm = keyword.toLowerCase();

      // Busca em múltiplos campos usando regex
      const websites = await collection.find({
        $or: [
          { keywords: { $regex: searchTerm, $options: 'i' } },
          { title: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } }
        ]
      })
      .sort({ clicks: -1 }) // Ordena por relevância (clicks)
      .toArray();

      return websites;
    } catch (error) {
      console.error('Erro ao buscar websites:', error);
      throw error;
    }
  }

  /**
   * Retorna todos os websites cadastrados
   * @param {number} limit - Limite de resultados
   * @returns {Promise<Array>} Lista de websites
   */
  static async findAll(limit = 100) {
    try {
      const collection = Website.getCollection();
      const websites = await collection.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();
      
      return websites;
    } catch (error) {
      console.error('Erro ao listar websites:', error);
      throw error;
    }
  }

  /**
   * Busca um website por ID
   * @param {string} id - ID do website
   * @returns {Promise<Object>} Website encontrado
   */
  static async findById(id) {
    try {
      const collection = Website.getCollection();
      const website = await collection.findOne({ _id: new ObjectId(id) });
      return website;
    } catch (error) {
      console.error('Erro ao buscar website por ID:', error);
      throw error;
    }
  }

  /**
   * Atualiza um website existente
   * @param {string} id - ID do website
   * @param {Object} data - Dados para atualização
   * @returns {Promise<Object>} Resultado da atualização
   */
  static async update(id, data) {
    try {
      const collection = Website.getCollection();
      
      const updateData = {
        ...data,
        updatedAt: new Date()
      };

      if (updateData.keywords) {
        updateData.keywords = updateData.keywords.map(k => k.toLowerCase());
      }

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      return result;
    } catch (error) {
      console.error('Erro ao atualizar website:', error);
      throw error;
    }
  }

  /**
   * Incrementa o contador de clicks de um website
   * @param {string} id - ID do website
   * @returns {Promise<Object>} Resultado da atualização
   */
  static async incrementClicks(id) {
    try {
      const collection = Website.getCollection();
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $inc: { clicks: 1 },
          $set: { updatedAt: new Date() }
        }
      );
      return result;
    } catch (error) {
      console.error('Erro ao incrementar clicks:', error);
      throw error;
    }
  }

  /**
   * Remove um website do banco de dados
   * @param {string} id - ID do website
   * @returns {Promise<Object>} Resultado da remoção
   */
  static async delete(id) {
    try {
      const collection = Website.getCollection();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      console.error('Erro ao deletar website:', error);
      throw error;
    }
  }

  /**
   * Retorna os websites mais populares (mais clicados)
   * @param {number} limit - Número de resultados
   * @returns {Promise<Array>} Lista de websites populares
   */
  static async getMostPopular(limit = 10) {
    try {
      const collection = Website.getCollection();
      const websites = await collection.find({})
        .sort({ clicks: -1 })
        .limit(limit)
        .toArray();
      
      return websites;
    } catch (error) {
      console.error('Erro ao buscar websites populares:', error);
      throw error;
    }
  }
}

export default Website;
