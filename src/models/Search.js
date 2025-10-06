import database from '../database/connection.js';

/**
 * Classe Search - Gerencia o histórico de buscas realizadas
 * Armazena informações sobre cada busca para análise e estatísticas
 */
class Search {
  constructor(data = {}) {
    this.query = data.query || '';
    this.resultsCount = data.resultsCount || 0;
    this.timestamp = data.timestamp || new Date();
    this.userAgent = data.userAgent || '';
    this.ip = data.ip || '';
  }

  /**
   * Retorna a coleção de searches do MongoDB
   * @returns {Collection} Coleção de searches
   */
  static getCollection() {
    const db = database.getDb();
    return db.collection('searches');
  }

  /**
   * Registra uma nova busca no histórico
   * @returns {Promise<Object>} Busca registrada
   */
  async insert() {
    try {
      const collection = Search.getCollection();
      
      const result = await collection.insertOne({
        query: this.query.toLowerCase(),
        resultsCount: this.resultsCount,
        timestamp: this.timestamp,
        userAgent: this.userAgent,
        ip: this.ip
      });

      return { _id: result.insertedId, ...this };
    } catch (error) {
      console.error('Erro ao registrar busca:', error);
      throw error;
    }
  }

  /**
   * Retorna o histórico de buscas
   * @param {number} limit - Número de resultados
   * @returns {Promise<Array>} Lista de buscas
   */
  static async getHistory(limit = 50) {
    try {
      const collection = Search.getCollection();
      const searches = await collection.find({})
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();
      
      return searches;
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      throw error;
    }
  }

  /**
   * Retorna as buscas mais populares (queries mais realizadas)
   * @param {number} limit - Número de resultados
   * @returns {Promise<Array>} Lista de buscas populares
   */
  static async getPopularSearches(limit = 10) {
    try {
      const collection = Search.getCollection();
      
      // Agregação para contar queries repetidas
      const popularSearches = await collection.aggregate([
        {
          $group: {
            _id: '$query',
            count: { $sum: 1 },
            lastSearch: { $max: '$timestamp' }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: limit
        },
        {
          $project: {
            _id: 0,
            query: '$_id',
            count: 1,
            lastSearch: 1
          }
        }
      ]).toArray();

      return popularSearches;
    } catch (error) {
      console.error('Erro ao buscar buscas populares:', error);
      throw error;
    }
  }

  /**
   * Retorna estatísticas das buscas
   * @returns {Promise<Object>} Estatísticas de buscas
   */
  static async getStatistics() {
    try {
      const collection = Search.getCollection();
      
      const totalSearches = await collection.countDocuments();
      const popularSearches = await Search.getPopularSearches(5);
      const recentSearches = await Search.getHistory(10);
      
      // Busca média de resultados
      const avgResults = await collection.aggregate([
        {
          $group: {
            _id: null,
            avgResults: { $avg: '$resultsCount' }
          }
        }
      ]).toArray();

      return {
        totalSearches,
        averageResults: avgResults[0]?.avgResults || 0,
        popularSearches,
        recentSearches
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }

  /**
   * Remove buscas antigas (mais de X dias)
   * @param {number} days - Dias para manter no histórico
   * @returns {Promise<Object>} Resultado da operação
   */
  static async cleanOldSearches(days = 30) {
    try {
      const collection = Search.getCollection();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      const result = await collection.deleteMany({
        timestamp: { $lt: cutoffDate }
      });

      return result;
    } catch (error) {
      console.error('Erro ao limpar buscas antigas:', error);
      throw error;
    }
  }
}

export default Search;
