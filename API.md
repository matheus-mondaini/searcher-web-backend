# API Documentation - Motor de Busca

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. Buscar Websites

**Endpoint:** `GET /api/search`

**Parâmetros:**
- `q` (query string, obrigatório) - Termo de busca

**Exemplo:**
```bash
curl "http://localhost:3000/api/search?q=javascript"
```

**Resposta:**
```json
{
  "query": "javascript",
  "totalResults": 5,
  "results": [
    {
      "_id": "...",
      "url": "https://developer.mozilla.org",
      "title": "MDN Web Docs",
      "description": "Recursos para desenvolvedores...",
      "keywords": ["javascript", "html", "css"],
      "clicks": 10,
      "relevanceScore": 25.5,
      "createdAt": "2025-10-05T...",
      "updatedAt": "2025-10-05T..."
    }
  ],
  "timestamp": "2025-10-05T..."
}
```

---

### 2. Listar Todos os Websites

**Endpoint:** `GET /api/websites`

**Exemplo:**
```bash
curl http://localhost:3000/api/websites
```

**Resposta:**
```json
{
  "websites": [...],
  "total": 15
}
```

---

### 3. Criar Novo Website

**Endpoint:** `POST /api/websites`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "url": "https://exemplo.com",
  "title": "Título do Website",
  "description": "Descrição do conteúdo",
  "keywords": ["palavra1", "palavra2", "palavra3"],
  "content": "Conteúdo textual completo"
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/api/websites \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://exemplo.com",
    "title": "Meu Site",
    "description": "Um site sobre tecnologia",
    "keywords": ["tech", "programação"],
    "content": "Conteúdo do site..."
  }'
```

**Resposta:**
```json
{
  "message": "Website indexado com sucesso",
  "website": {
    "_id": "...",
    "url": "https://exemplo.com",
    "title": "Meu Site",
    ...
  }
}
```

---

### 4. Buscar Website por ID

**Endpoint:** `GET /api/websites/:id`

**Exemplo:**
```bash
curl http://localhost:3000/api/websites/67010a1b2c3d4e5f6a7b8c9d
```

---

### 5. Atualizar Website

**Endpoint:** `PUT /api/websites/:id`

**Headers:**
```
Content-Type: application/json
```

**Body:** (campos a serem atualizados)
```json
{
  "title": "Novo Título",
  "description": "Nova descrição"
}
```

**Exemplo:**
```bash
curl -X PUT http://localhost:3000/api/websites/67010a1b2c3d4e5f6a7b8c9d \
  -H "Content-Type: application/json" \
  -d '{"title": "Título Atualizado"}'
```

---

### 6. Deletar Website

**Endpoint:** `DELETE /api/websites/:id`

**Exemplo:**
```bash
curl -X DELETE http://localhost:3000/api/websites/67010a1b2c3d4e5f6a7b8c9d
```

---

### 7. Registrar Click

**Endpoint:** `POST /api/websites/:id/click`

Incrementa o contador de clicks de um website.

**Exemplo:**
```bash
curl -X POST http://localhost:3000/api/websites/67010a1b2c3d4e5f6a7b8c9d/click
```

---

### 8. Palavras-chave Populares

**Endpoint:** `GET /api/keywords`

**Exemplo:**
```bash
curl http://localhost:3000/api/keywords
```

**Resposta:**
```json
{
  "keywords": [
    {
      "word": "javascript",
      "searchCount": 45,
      "relatedWebsites": [...],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "total": 20
}
```

---

### 9. Sugestões de Busca

**Endpoint:** `GET /api/suggestions`

**Parâmetros:**
- `q` (query string, obrigatório) - Termo parcial

**Exemplo:**
```bash
curl "http://localhost:3000/api/suggestions?q=java"
```

**Resposta:**
```json
{
  "suggestions": ["javascript", "java"]
}
```

---

### 10. Estatísticas do Sistema

**Endpoint:** `GET /api/statistics`

**Exemplo:**
```bash
curl http://localhost:3000/api/statistics
```

**Resposta:**
```json
{
  "totalWebsites": 15,
  "popularWebsites": [...],
  "popularKeywords": [...],
  "searchStatistics": {
    "totalSearches": 123,
    "averageResults": 4.5,
    "popularSearches": [...],
    "recentSearches": [...]
  }
}
```

---

### 11. Histórico de Buscas

**Endpoint:** `GET /api/search/history`

**Exemplo:**
```bash
curl http://localhost:3000/api/search/history
```

**Resposta:**
```json
{
  "history": [
    {
      "query": "javascript",
      "resultsCount": 5,
      "timestamp": "2025-10-05T...",
      "userAgent": "...",
      "ip": "..."
    }
  ],
  "total": 50
}
```

---

## Códigos de Status HTTP

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `400 Bad Request` - Dados inválidos ou ausentes
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

---

## Exemplos de Uso com JavaScript

### Buscar Websites
```javascript
async function buscar(termo) {
  const response = await fetch(`http://localhost:3000/api/search?q=${termo}`);
  const data = await response.json();
  console.log(data);
}

buscar('javascript');
```

### Adicionar Website
```javascript
async function adicionarWebsite() {
  const response = await fetch('http://localhost:3000/api/websites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: 'https://exemplo.com',
      title: 'Meu Site',
      description: 'Descrição do site',
      keywords: ['tech', 'web']
    })
  });
  
  const data = await response.json();
  console.log(data);
}

adicionarWebsite();
```
