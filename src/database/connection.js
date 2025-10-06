import { MongoClient } from 'mongodb';

/**
 * Classe responsável pela conexão com o MongoDB
 * Implementa o padrão Singleton para garantir uma única conexão
 */
class Database {
  constructor() {
    this.client = null;
    this.db = null;
    this.url = 'mongodb://localhost:27017';
    this.dbName = 'motor_de_busca';
  }

  /**
   * Conecta ao banco de dados MongoDB
   * @returns {Promise<Object>} Instância do banco de dados
   */
  async connect() {
    if (this.db) {
      return this.db;
    }

    try {
      this.client = new MongoClient(this.url);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log('✅ Conectado ao MongoDB com sucesso!');
      return this.db;
    } catch (error) {
      console.error('❌ Erro ao conectar ao MongoDB:', error);
      throw error;
    }
  }

  /**
   * Retorna a instância do banco de dados
   * @returns {Object} Instância do banco de dados
   */
  getDb() {
    if (!this.db) {
      throw new Error('Banco de dados não conectado. Execute connect() primeiro.');
    }
    return this.db;
  }

  /**
   * Fecha a conexão com o banco de dados
   */
  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('✅ Conexão com MongoDB fechada.');
    }
  }
}

// Exporta uma instância única (Singleton)
export default new Database();
