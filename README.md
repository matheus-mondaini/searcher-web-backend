
# Biblioteca de Acesso ao MongoDB

Projeto simples para demonstração de CRUD com Node.js e MongoDB, sem rotas HTTP ou camadas extras (sem MVC, pasta src/, etc.). Executa operações diretamente via scripts. O foco é demonstrar o acesso ao banco de dados através de uma biblioteca simples executada diretamente pelo arquivo `app.js` e **três classes com operações CRUD completas**.

## Visão Geral

- **3 classes CRUD:** Website, Keyword, SearchRecord
- **Banco de dados:** MongoDB (driver oficial)
- **Logger:** Grava erros em `logs/erros.log`
- **Scripts principais:**
  - `app.js` (demonstração)
  - `seed.js` (popular banco)

## Execução Rápida

1. Instale dependências:
   ```bash
   npm install
   ```
2. Certifique-se de que o MongoDB está em execução em `mongodb://127.0.0.1:27017`. Ou, instale e inicie o MongoDB ([guia](MONGODB-INSTALL.md))
3. (Opcional) Popule o banco:
   ```bash
   npm run seed
   ```
4. Execute a demonstração:
   ```bash
   npm start
   ```

O `seed.js` popula o banco com websites reais da temática (MDN, GitHub, Stack Overflow, etc.). O `app.js` cria registros de teste, mostra o retorno dos métodos e limpa os dados ao final.

## Documentação Detalhada

- [INSTALACAO.md](INSTALACAO.md) — Instalação e configuração
- [ESTRUTURA.md](ESTRUTURA.md) — Estrutura dos arquivos
- [COMANDOS.md](COMANDOS.md) — Comandos úteis
- [MONGODB-INSTALL.md](MONGODB-INSTALL.md) — Instalação do MongoDB
- [VERIFICACAO-REQUISITOS.md](VERIFICACAO-REQUISITOS.md) — Pré-requisitos
- [API.md](API.md) — Métodos e exemplos
- [CLASSES.md](CLASSES.md) — Detalhes das classes

Consulte os arquivos acima para instruções completas, exemplos de uso e dicas de troubleshooting.

## Estrutura Simplificada

```
projeto-1/
├── Website.js
├── Keyword.js
├── SearchRecord.js
├── database.js
├── logger.js
├── app.js
├── seed.js
└── package.json
```

---

**Desenvolvido por:** Matheus Mondaini (2504219) — UTFPR — EC48B
