import Website from '../models/Website.js';
import Keyword from '../models/Keyword.js';
import Search from '../models/Search.js';

/**
 * Serviço de Busca - Implementa a lógica de busca de websites
 * Similar ao funcionamento de um motor de busca como o Google
 */
class SearchService {
  /**
   * Realiza uma busca por palavras-chave
   * @param {string} query - Termo de busca
   * @param {Object} options - Opções da busca (userAgent, ip)
   * @returns {Promise<Object>} Resultados da busca
   */
  static async search(query, options = {}) {
    try {
      if (!query || query.trim() === '') {
        throw new Error('Query de busca não pode estar vazia');
      }

      const searchTerm = query.trim();
      
      // Busca websites que correspondem ao termo
      const websites = await Website.findByKeyword(searchTerm);

      // Registra a busca no histórico
      const search = new Search({
        query: searchTerm,
        resultsCount: websites.length,
        userAgent: options.userAgent || '',
        ip: options.ip || ''
      });
      await search.insert();

      // Registra/incrementa a keyword
      const keyword = new Keyword({ word: searchTerm });
      await keyword.insert();

      // Calcula relevância dos resultados
      const rankedResults = this.rankResults(websites, searchTerm);

      return {
        query: searchTerm,
        totalResults: websites.length,
        results: rankedResults,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Erro no serviço de busca:', error);
      throw error;
    }
  }

  /**
   * Rankeia os resultados por relevância
   * @param {Array} websites - Lista de websites
   * @param {string} query - Termo de busca
   * @returns {Array} Websites rankeados
   */
  static rankResults(websites, query) {
    const queryLower = query.toLowerCase();
    
    return websites.map(website => {
      let score = 0;
      
      // Pontuação por matches exatos no título (peso maior)
      if (website.title.toLowerCase().includes(queryLower)) {
        score += 10;
      }
      
      // Pontuação por keywords
      const matchingKeywords = website.keywords.filter(k => 
        k.toLowerCase().includes(queryLower) || queryLower.includes(k.toLowerCase())
      );
      score += matchingKeywords.length * 5;
      
      // Pontuação por descrição
      if (website.description.toLowerCase().includes(queryLower)) {
        score += 3;
      }
      
      // Pontuação por popularidade (clicks)
      score += Math.log(website.clicks + 1) * 2;
      
      return {
        ...website,
        relevanceScore: score
      };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Indexa um novo website no sistema
   * @param {Object} websiteData - Dados do website
   * @returns {Promise<Object>} Website indexado
   */
  static async indexWebsite(websiteData) {
    try {
      // Valida dados obrigatórios
      if (!websiteData.url) {
        throw new Error('URL é obrigatória');
      }
      if (!websiteData.title) {
        throw new Error('Título é obrigatório');
      }

      // Cria e insere o website
      const website = new Website(websiteData);
      const result = await website.insert();

      // Associa keywords ao website
      if (websiteData.keywords && websiteData.keywords.length > 0) {
        for (const keyword of websiteData.keywords) {
          await Keyword.addWebsiteAssociation(keyword, result._id.toString());
        }
      }

      return result;
    } catch (error) {
      console.error('Erro ao indexar website:', error);
      throw error;
    }
  }

  /**
   * Retorna sugestões de busca baseadas em buscas populares
   * @param {string} partial - Parte da palavra
   * @param {number} limit - Limite de sugestões
   * @returns {Promise<Array>} Sugestões
   */
  static async getSuggestions(partial, limit = 5) {
    try {
      const keywords = await Keyword.findAll();
      
      const suggestions = keywords
        .filter(k => k.word.startsWith(partial.toLowerCase()))
        .sort((a, b) => b.searchCount - a.searchCount)
        .slice(0, limit)
        .map(k => k.word);

      return suggestions;
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      throw error;
    }
  }

  /**
   * Retorna estatísticas gerais do sistema
   * @returns {Promise<Object>} Estatísticas
   */
  static async getStatistics() {
    try {
      const totalWebsites = (await Website.findAll()).length;
      const popularWebsites = await Website.getMostPopular(5);
      const popularKeywords = await Keyword.getMostSearched(10);
      const searchStats = await Search.getStatistics();

      return {
        totalWebsites,
        popularWebsites,
        popularKeywords,
        searchStatistics: searchStats
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }
}

export default SearchService;
