import Website from '../models/Website.js';
import SearchService from '../services/SearchService.js';
import Keyword from '../models/Keyword.js';
import Search from '../models/Search.js';
import { URL } from 'url';

/**
 * Router - Gerencia as rotas da API
 * Implementa endpoints para busca e gerenciamento de websites
 */
class Router {
  /**
   * Processa requisições HTTP e roteia para o handler apropriado
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   */
  static async handle(req, res) {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const path = url.pathname;
      const method = req.method;

      // Headers CORS
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      // Roteamento
      if (path === '/api/search' && method === 'GET') {
        await this.handleSearch(req, res, url);
      } else if (path === '/api/websites' && method === 'GET') {
        await this.handleGetWebsites(req, res);
      } else if (path === '/api/websites' && method === 'POST') {
        await this.handleCreateWebsite(req, res);
      } else if (path.match(/^\/api\/websites\/[a-f0-9]+$/) && method === 'GET') {
        await this.handleGetWebsite(req, res, path);
      } else if (path.match(/^\/api\/websites\/[a-f0-9]+$/) && method === 'PUT') {
        await this.handleUpdateWebsite(req, res, path);
      } else if (path.match(/^\/api\/websites\/[a-f0-9]+$/) && method === 'DELETE') {
        await this.handleDeleteWebsite(req, res, path);
      } else if (path.match(/^\/api\/websites\/[a-f0-9]+\/click$/) && method === 'POST') {
        await this.handleWebsiteClick(req, res, path);
      } else if (path === '/api/keywords' && method === 'GET') {
        await this.handleGetKeywords(req, res);
      } else if (path === '/api/suggestions' && method === 'GET') {
        await this.handleGetSuggestions(req, res, url);
      } else if (path === '/api/statistics' && method === 'GET') {
        await this.handleGetStatistics(req, res);
      } else if (path === '/api/search/history' && method === 'GET') {
        await this.handleGetSearchHistory(req, res);
      } else {
        this.sendResponse(res, 404, { error: 'Rota não encontrada' });
      }
    } catch (error) {
      console.error('Erro no router:', error);
      this.sendResponse(res, 500, { error: 'Erro interno do servidor', message: error.message });
    }
  }

  /**
   * GET /api/search?q=termo
   * Busca websites por palavra-chave
   */
  static async handleSearch(req, res, url) {
    try {
      const query = url.searchParams.get('q');
      
      if (!query) {
        this.sendResponse(res, 400, { error: 'Parâmetro "q" é obrigatório' });
        return;
      }

      const results = await SearchService.search(query, {
        userAgent: req.headers['user-agent'],
        ip: req.socket.remoteAddress
      });

      this.sendResponse(res, 200, results);
    } catch (error) {
      this.sendResponse(res, 500, { error: error.message });
    }
  }

  /**
   * GET /api/websites
   * Lista todos os websites
   */
  static async handleGetWebsites(req, res) {
    try {
      const websites = await Website.findAll();
      this.sendResponse(res, 200, { websites, total: websites.length });
    } catch (error) {
      this.sendResponse(res, 500, { error: error.message });
    }
  }

  /**
   * POST /api/websites
   * Cria um novo website
   */
  static async handleCreateWebsite(req, res) {
    try {
      const body = await this.getRequestBody(req);
      const website = await SearchService.indexWebsite(body);
      this.sendResponse(res, 201, { message: 'Website indexado com sucesso', website });
    } catch (error) {
      this.sendResponse(res, 400, { error: error.message });
    }
  }

  /**
   * GET /api/websites/:id
   * Retorna um website específico
   */
  static async handleGetWebsite(req, res, path) {
    try {
      const id = path.split('/').pop();
      const website = await Website.findById(id);
      
      if (!website) {
        this.sendResponse(res, 404, { error: 'Website não encontrado' });
        return;
      }

      this.sendResponse(res, 200, website);
    } catch (error) {
      this.sendResponse(res, 500, { error: error.message });
    }
  }

  /**
   * PUT /api/websites/:id
   * Atualiza um website
   */
  static async handleUpdateWebsite(req, res, path) {
    try {
      const id = path.split('/').pop();
      const body = await this.getRequestBody(req);
      const result = await Website.update(id, body);
      
      if (result.matchedCount === 0) {
        this.sendResponse(res, 404, { error: 'Website não encontrado' });
        return;
      }

      this.sendResponse(res, 200, { message: 'Website atualizado com sucesso' });
    } catch (error) {
      this.sendResponse(res, 400, { error: error.message });
    }
  }

  /**
   * DELETE /api/websites/:id
   * Remove um website
   */
  static async handleDeleteWebsite(req, res, path) {
    try {
      const id = path.split('/').pop();
      const result = await Website.delete(id);
      
      if (result.deletedCount === 0) {
        this.sendResponse(res, 404, { error: 'Website não encontrado' });
        return;
      }

      this.sendResponse(res, 200, { message: 'Website removido com sucesso' });
    } catch (error) {
      this.sendResponse(res, 500, { error: error.message });
    }
  }

  /**
   * POST /api/websites/:id/click
   * Registra um click em um website
   */
  static async handleWebsiteClick(req, res, path) {
    try {
      const id = path.split('/')[3];
      await Website.incrementClicks(id);
      this.sendResponse(res, 200, { message: 'Click registrado' });
    } catch (error) {
      this.sendResponse(res, 500, { error: error.message });
    }
  }

  /**
   * GET /api/keywords
   * Lista palavras-chave mais buscadas
   */
  static async handleGetKeywords(req, res) {
    try {
      const keywords = await Keyword.getMostSearched(20);
      this.sendResponse(res, 200, { keywords, total: keywords.length });
    } catch (error) {
      this.sendResponse(res, 500, { error: error.message });
    }
  }

  /**
   * GET /api/suggestions?q=termo
   * Retorna sugestões de busca
   */
  static async handleGetSuggestions(req, res, url) {
    try {
      const query = url.searchParams.get('q');
      
      if (!query) {
        this.sendResponse(res, 400, { error: 'Parâmetro "q" é obrigatório' });
        return;
      }

      const suggestions = await SearchService.getSuggestions(query);
      this.sendResponse(res, 200, { suggestions });
    } catch (error) {
      this.sendResponse(res, 500, { error: error.message });
    }
  }

  /**
   * GET /api/statistics
   * Retorna estatísticas do sistema
   */
  static async handleGetStatistics(req, res) {
    try {
      const statistics = await SearchService.getStatistics();
      this.sendResponse(res, 200, statistics);
    } catch (error) {
      this.sendResponse(res, 500, { error: error.message });
    }
  }

  /**
   * GET /api/search/history
   * Retorna histórico de buscas
   */
  static async handleGetSearchHistory(req, res) {
    try {
      const history = await Search.getHistory(50);
      this.sendResponse(res, 200, { history, total: history.length });
    } catch (error) {
      this.sendResponse(res, 500, { error: error.message });
    }
  }

  /**
   * Envia resposta HTTP formatada
   */
  static sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data, null, 2));
  }

  /**
   * Lê o corpo da requisição
   */
  static getRequestBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error('JSON inválido'));
        }
      });
      req.on('error', reject);
    });
  }
}

export default Router;
