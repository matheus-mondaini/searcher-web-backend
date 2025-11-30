import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'erros.log');

class Logger {
  constructor() {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
  }

  /**
   * Registra erros em um arquivo txt
   * @param {string} message - Mensagem de erro
   * @param {Error} [error] - Objeto de erro opcional
   */
  logError(message, error) {
    const timestamp = new Date().toISOString();
    const stack = error?.stack ?? 'Sem stack disponível';
    const logEntry = `\n[${timestamp}]\nMensagem: ${message}\nStack: ${stack}\n`;
    fs.appendFileSync(LOG_FILE, logEntry, 'utf-8');
  }
}

export default new Logger();
