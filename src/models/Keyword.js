import database from '../database/connection.js';

/**
 * Classe Keyword - Gerencia palavras-chave e suas estatísticas
 * Armazena informações sobre as palavras-chave mais buscadas
 */
class Keyword {
  constructor(data = {}) {
    this.word = data.word ? data.word.toLowerCase() : '';
    this.searchCount = data.searchCount || 0;
    this.relatedWebsites = data.relatedWebsites || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Retorna a coleção de keywords do MongoDB
   * @returns {Collection} Coleção de keywords
   */
  static getCollection() {
    const db = database.getDb();
    return db.collection('keywords');
  }

  /**
   * Insere uma nova palavra-chave ou incrementa seu contador
   * @returns {Promise<Object>} Palavra-chave inserida/atualizada
   */
  async insert() {
    try {
      const collection = Keyword.getCollection();
      
      // Verifica se a palavra-chave já existe
      const exists = await collection.findOne({ word: this.word });
      
      if (exists) {
        // Se existe, incrementa o contador
        await collection.updateOne(
          { word: this.word },
          { 
            $inc: { searchCount: 1 },
            $set: { updatedAt: new Date() }
          }
        );
        return { ...exists, searchCount: exists.searchCount + 1 };
      } else {
        // Se não existe, insere nova
        const result = await collection.insertOne({
          word: this.word,
          searchCount: 1,
          relatedWebsites: this.relatedWebsites,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        });
        return { _id: result.insertedId, ...this };
      }
    } catch (error) {
      console.error('Erro ao inserir keyword:', error);
      throw error;
    }
  }

  /**
   * Retorna as palavras-chave mais buscadas
   * @param {number} limit - Número de resultados
   * @returns {Promise<Array>} Lista de palavras-chave populares
   */
  static async getMostSearched(limit = 10) {
    try {
      const collection = Keyword.getCollection();
      const keywords = await collection.find({})
        .sort({ searchCount: -1 })
        .limit(limit)
        .toArray();
      
      return keywords;
    } catch (error) {
      console.error('Erro ao buscar keywords mais buscadas:', error);
      throw error;
    }
  }

  /**
   * Busca uma palavra-chave específica
   * @param {string} word - Palavra para buscar
   * @returns {Promise<Object>} Palavra-chave encontrada
   */
  static async findByWord(word) {
    try {
      const collection = Keyword.getCollection();
      const keyword = await collection.findOne({ word: word.toLowerCase() });
      return keyword;
    } catch (error) {
      console.error('Erro ao buscar keyword:', error);
      throw error;
    }
  }

  /**
   * Associa uma keyword com um website
   * @param {string} word - Palavra-chave
   * @param {string} websiteId - ID do website
   * @returns {Promise<Object>} Resultado da atualização
   */
  static async addWebsiteAssociation(word, websiteId) {
    try {
      const collection = Keyword.getCollection();
      const result = await collection.updateOne(
        { word: word.toLowerCase() },
        { 
          $addToSet: { relatedWebsites: websiteId },
          $set: { updatedAt: new Date() }
        },
        { upsert: true }
      );
      return result;
    } catch (error) {
      console.error('Erro ao associar website à keyword:', error);
      throw error;
    }
  }

  /**
   * Retorna todas as keywords
   * @returns {Promise<Array>} Lista de todas as keywords
   */
  static async findAll() {
    try {
      const collection = Keyword.getCollection();
      const keywords = await collection.find({})
        .sort({ searchCount: -1 })
        .toArray();
      
      return keywords;
    } catch (error) {
      console.error('Erro ao listar keywords:', error);
      throw error;
    }
  }
}

export default Keyword;
