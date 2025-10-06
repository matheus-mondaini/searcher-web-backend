# Documentação das Classes - Motor de Busca

## Arquitetura do Projeto

O projeto segue uma arquitetura em camadas:

```
┌─────────────────────────────────────┐
│        Interface (HTML/CSS/JS)      │
├─────────────────────────────────────┤
│          API Routes (HTTP)          │
├─────────────────────────────────────┤
│     Services (Lógica de Negócio)    │
├─────────────────────────────────────┤
│      Models (Entidades/CRUD)        │
├─────────────────────────────────────┤
│    Database Connection (MongoDB)    │
└─────────────────────────────────────┘
```

---

## Classes Implementadas

### 1. Database (`src/database/connection.js`)

**Descrição:** Gerencia a conexão com o MongoDB usando o padrão Singleton.

**Propriedades:**
- `client` - Cliente MongoDB
- `db` - Instância do banco de dados
- `url` - URL de conexão (mongodb://localhost:27017)
- `dbName` - Nome do banco (motor_de_busca)

**Métodos:**

#### `async connect()`
Conecta ao MongoDB e retorna a instância do banco.

```javascript
await database.connect();
```

#### `getDb()`
Retorna a instância do banco de dados conectado.

```javascript
const db = database.getDb();
```

#### `async close()`
Fecha a conexão com o banco de dados.

```javascript
await database.close();
```

---

### 2. Website (`src/models/Website.js`)

**Descrição:** Representa um website indexado no sistema. Implementa operações CRUD completas.

**Propriedades:**
- `url` - URL do website (string, obrigatório, único)
- `title` - Título do website (string, obrigatório)
- `description` - Descrição do conteúdo (string)
- `keywords` - Array de palavras-chave (array)
- `content` - Conteúdo textual (string)
- `createdAt` - Data de criação (Date)
- `updatedAt` - Data de atualização (Date)
- `clicks` - Contador de visualizações (number)

**Métodos Estáticos:**

#### `static getCollection()`
Retorna a coleção 'websites' do MongoDB.

#### `static async findByKeyword(keyword)`
Busca websites que contêm a palavra-chave.

**Parâmetros:**
- `keyword` (string) - Palavra para buscar

**Retorna:** Array de websites

**Busca em:**
- keywords (array)
- title
- description
- content

**Exemplo:**
```javascript
const results = await Website.findByKeyword('javascript');
```

#### `static async findAll(limit = 100)`
Lista todos os websites cadastrados.

**Parâmetros:**
- `limit` (number) - Máximo de resultados (padrão: 100)

**Retorna:** Array de websites

**Exemplo:**
```javascript
const websites = await Website.findAll(50);
```

#### `static async findById(id)`
Busca um website específico pelo ID.

**Parâmetros:**
- `id` (string) - ObjectId do MongoDB

**Retorna:** Objeto website ou null

**Exemplo:**
```javascript
const website = await Website.findById('67010a1b2c3d4e5f6a7b8c9d');
```

#### `static async update(id, data)`
Atualiza um website existente.

**Parâmetros:**
- `id` (string) - ID do website
- `data` (object) - Dados para atualizar

**Exemplo:**
```javascript
await Website.update(id, {
  title: 'Novo Título',
  description: 'Nova descrição'
});
```

#### `static async incrementClicks(id)`
Incrementa o contador de clicks.

**Exemplo:**
```javascript
await Website.incrementClicks(websiteId);
```

#### `static async delete(id)`
Remove um website do banco.

**Exemplo:**
```javascript
await Website.delete(websiteId);
```

#### `static async getMostPopular(limit = 10)`
Retorna os websites mais clicados.

**Exemplo:**
```javascript
const populares = await Website.getMostPopular(5);
```

**Métodos de Instância:**

#### `async insert()`
Insere o website no banco de dados.

**Exemplo:**
```javascript
const website = new Website({
  url: 'https://exemplo.com',
  title: 'Exemplo',
  description: 'Site de exemplo',
  keywords: ['exemplo', 'teste']
});

await website.insert();
```

---

### 3. Keyword (`src/models/Keyword.js`)

**Descrição:** Gerencia palavras-chave e suas estatísticas de busca.

**Propriedades:**
- `word` - Palavra-chave (string, único)
- `searchCount` - Número de buscas (number)
- `relatedWebsites` - IDs de websites relacionados (array)
- `createdAt` - Data de criação (Date)
- `updatedAt` - Data de atualização (Date)

**Métodos Estáticos:**

#### `static async getMostSearched(limit = 10)`
Retorna as palavras-chave mais buscadas.

**Exemplo:**
```javascript
const topKeywords = await Keyword.getMostSearched(10);
```

#### `static async findByWord(word)`
Busca uma palavra-chave específica.

**Exemplo:**
```javascript
const keyword = await Keyword.findByWord('javascript');
```

#### `static async addWebsiteAssociation(word, websiteId)`
Associa uma palavra-chave a um website.

**Exemplo:**
```javascript
await Keyword.addWebsiteAssociation('javascript', websiteId);
```

#### `static async findAll()`
Lista todas as palavras-chave.

**Métodos de Instância:**

#### `async insert()`
Insere ou incrementa contador de uma palavra-chave.

**Comportamento:**
- Se a palavra já existe: incrementa searchCount
- Se não existe: cria nova entrada

**Exemplo:**
```javascript
const keyword = new Keyword({ word: 'javascript' });
await keyword.insert();
```

---

### 4. Search (`src/models/Search.js`)

**Descrição:** Registra e gerencia o histórico de buscas realizadas.

**Propriedades:**
- `query` - Termo de busca (string)
- `resultsCount` - Quantidade de resultados (number)
- `timestamp` - Data/hora da busca (Date)
- `userAgent` - User agent do navegador (string)
- `ip` - Endereço IP (string)

**Métodos Estáticos:**

#### `static async getHistory(limit = 50)`
Retorna o histórico de buscas.

**Exemplo:**
```javascript
const history = await Search.getHistory(20);
```

#### `static async getPopularSearches(limit = 10)`
Retorna as buscas mais realizadas (agregação).

**Exemplo:**
```javascript
const popular = await Search.getPopularSearches(10);
// Retorna: [{ query: 'javascript', count: 45, lastSearch: Date }]
```

#### `static async getStatistics()`
Retorna estatísticas completas das buscas.

**Retorna:**
```javascript
{
  totalSearches: 123,
  averageResults: 4.5,
  popularSearches: [...],
  recentSearches: [...]
}
```

#### `static async cleanOldSearches(days = 30)`
Remove buscas antigas do histórico.

**Exemplo:**
```javascript
await Search.cleanOldSearches(90); // Remove buscas com +90 dias
```

**Métodos de Instância:**

#### `async insert()`
Registra uma nova busca no histórico.

**Exemplo:**
```javascript
const search = new Search({
  query: 'javascript',
  resultsCount: 5,
  userAgent: req.headers['user-agent'],
  ip: req.socket.remoteAddress
});

await search.insert();
```

---

### 5. SearchService (`src/services/SearchService.js`)

**Descrição:** Implementa a lógica de negócio do motor de busca.

**Métodos Estáticos:**

#### `static async search(query, options = {})`
Realiza uma busca completa por palavras-chave.

**Parâmetros:**
- `query` (string) - Termo de busca
- `options` (object) - { userAgent, ip }

**Retorna:**
```javascript
{
  query: 'javascript',
  totalResults: 5,
  results: [...], // Websites rankeados
  timestamp: Date
}
```

**Funcionalidades:**
1. Busca websites por keyword
2. Registra a busca no histórico
3. Incrementa contador da keyword
4. Rankeia resultados por relevância

**Exemplo:**
```javascript
const results = await SearchService.search('javascript', {
  userAgent: 'Mozilla/5.0...',
  ip: '127.0.0.1'
});
```

#### `static rankResults(websites, query)`
Calcula score de relevância e ordena resultados.

**Algoritmo de Ranking:**
- Título contém query: +10 pontos
- Keyword match: +5 pontos por keyword
- Descrição contém query: +3 pontos
- Popularidade (clicks): +2 * log(clicks + 1)

**Exemplo:**
```javascript
const ranked = SearchService.rankResults(websites, 'javascript');
```

#### `static async indexWebsite(websiteData)`
Indexa um novo website no sistema.

**Funcionalidades:**
1. Valida dados obrigatórios
2. Cria e insere website
3. Associa keywords ao website

**Exemplo:**
```javascript
const website = await SearchService.indexWebsite({
  url: 'https://exemplo.com',
  title: 'Exemplo',
  keywords: ['teste', 'exemplo']
});
```

#### `static async getSuggestions(partial, limit = 5)`
Retorna sugestões de busca baseadas em keywords.

**Exemplo:**
```javascript
const suggestions = await SearchService.getSuggestions('java');
// Retorna: ['javascript', 'java']
```

#### `static async getStatistics()`
Retorna estatísticas gerais do sistema.

**Retorna:**
```javascript
{
  totalWebsites: 15,
  popularWebsites: [...],
  popularKeywords: [...],
  searchStatistics: {...}
}
```

---

### 6. Router (`src/routes/api.js`)

**Descrição:** Gerencia rotas HTTP e roteia requisições.

**Métodos Estáticos:**

#### `static async handle(req, res)`
Processa requisições HTTP e roteia para handlers.

**Rotas Implementadas:**
- `GET /api/search?q=termo` - Buscar websites
- `GET /api/websites` - Listar websites
- `POST /api/websites` - Criar website
- `GET /api/websites/:id` - Buscar por ID
- `PUT /api/websites/:id` - Atualizar website
- `DELETE /api/websites/:id` - Deletar website
- `POST /api/websites/:id/click` - Registrar click
- `GET /api/keywords` - Listar keywords
- `GET /api/suggestions?q=termo` - Sugestões
- `GET /api/statistics` - Estatísticas
- `GET /api/search/history` - Histórico

#### `static sendResponse(res, statusCode, data)`
Envia resposta HTTP formatada em JSON.

#### `static getRequestBody(req)`
Lê e parseia o corpo da requisição.

---

## Fluxo de uma Busca

```
1. Usuário digita "javascript" e clica em Buscar
   ↓
2. Frontend (script.js) chama GET /api/search?q=javascript
   ↓
3. Router recebe e chama SearchService.search()
   ↓
4. SearchService executa:
   a) Website.findByKeyword('javascript') - busca websites
   b) Search.insert() - registra busca
   c) Keyword.insert() - incrementa contador
   d) rankResults() - calcula relevância
   ↓
5. Retorna resultados ordenados por score
   ↓
6. Frontend exibe resultados formatados
```

---

## Padrões Utilizados

1. **Singleton** - Database (única conexão)
2. **Static Methods** - Models (acesso direto ao banco)
3. **Service Layer** - Lógica de negócio separada
4. **MVC** - Models, Views (HTML), Controllers (Routes)

---

## Boas Práticas Implementadas

✅ Código comentado e documentado  
✅ Tratamento de erros  
✅ Validação de dados  
✅ Separação de responsabilidades  
✅ Padrões de projeto  
✅ Código modular e reutilizável  
✅ Nomenclatura clara e consistente  
✅ Async/await para operações assíncronas  
