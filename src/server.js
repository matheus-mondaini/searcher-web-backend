import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import database from './database/connection.js';
import Router from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

/**
 * Servidor HTTP - Motor de Busca de Websites
 * Projeto 1 - EC48B - Programação Web Back-End
 */
class Server {
  constructor() {
    this.server = null;
  }

  /**
   * Retorna o tipo MIME baseado na extensão do arquivo
   */
  getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }

  /**
   * Serve arquivos estáticos do diretório public
   */
  serveStaticFile(req, res) {
    let filePath = path.join(__dirname, '..', 'public', req.url === '/' ? 'index.html' : req.url);
    
    // Previne acesso a diretórios acima de public
    const publicDir = path.join(__dirname, '..', 'public');
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(publicDir)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404);
          res.end('Arquivo não encontrado');
        } else {
          res.writeHead(500);
          res.end('Erro interno do servidor');
        }
      } else {
        res.writeHead(200, { 'Content-Type': this.getMimeType(filePath) });
        res.end(data);
      }
    });
  }

  /**
   * Handler principal de requisições
   */
  async handleRequest(req, res) {
    console.log(`${req.method} ${req.url}`);

    // Rotas da API
    if (req.url.startsWith('/api/')) {
      await Router.handle(req, res);
    } else {
      // Arquivos estáticos
      this.serveStaticFile(req, res);
    }
  }

  /**
   * Inicia o servidor
   */
  async start() {
    try {
      // Conecta ao banco de dados
      await database.connect();

      // Cria servidor HTTP
      this.server = http.createServer((req, res) => {
        this.handleRequest(req, res);
      });

      // Inicia servidor
      this.server.listen(PORT, () => {
        console.log('╔═══════════════════════════════════════════════════════╗');
        console.log('║       MOTOR DE BUSCA - Sistema de Busca Web          ║');
        console.log('║                                                       ║');
        console.log('║  Projeto 1 - EC48B - Programação Web Back-End        ║');
        console.log('║  Aluno: Matheus Mondaini (2504219)                   ║');
        console.log('╚═══════════════════════════════════════════════════════╝');
        console.log('');
        console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
        console.log('');
        console.log('📚 Endpoints disponíveis:');
        console.log('   GET  /                      - Interface de busca');
        console.log('   GET  /api/search?q=termo    - Buscar websites');
        console.log('   GET  /api/websites          - Listar websites');
        console.log('   POST /api/websites          - Adicionar website');
        console.log('   GET  /api/keywords          - Keywords populares');
        console.log('   GET  /api/statistics        - Estatísticas');
        console.log('   GET  /api/search/history    - Histórico de buscas');
        console.log('');
        console.log('💡 Pressione Ctrl+C para parar o servidor');
        console.log('');
      });

      // Tratamento de encerramento gracioso
      process.on('SIGINT', async () => {
        console.log('\n\n🛑 Encerrando servidor...');
        await database.close();
        this.server.close(() => {
          console.log('✅ Servidor encerrado com sucesso!');
          process.exit(0);
        });
      });

    } catch (error) {
      console.error('❌ Erro ao iniciar servidor:', error);
      process.exit(1);
    }
  }
}

// Inicia o servidor
const server = new Server();
server.start();
