# Motor de Busca de Websites

**Disciplina:** Programação Web Back-End (EC48B)  
**Projeto:** Projeto 1 - Biblioteca de Acesso a SGDBs  
**Aluno:** Matheus Mondaini (2504219)  
**Data:** Outubro 2025

## Descrição

Sistema de busca e armazenamento de websites baseado em palavras-chave, similar ao Google. O projeto implementa uma biblioteca de classes para acesso ao MongoDB utilizando Node.js puro.

## Temática

Serviço de busca de websites com:
- Indexação de URLs e conteúdo
- Busca por palavras-chave
- Armazenamento de metadados (título, descrição, tags)
- Ranking de relevância

## Tecnologias

- **Backend:** Node.js (puro)
- **Banco de Dados:** MongoDB
- **Frontend:** HTML e CSS (puros)

## Estrutura do Projeto

```
projeto-1/
├── src/
│   ├── database/
│   │   └── connection.js      # Conexão com MongoDB
│   ├── models/
│   │   ├── Website.js         # Classe para websites
│   │   ├── Keyword.js         # Classe para palavras-chave
│   │   └── Search.js          # Classe para buscas
│   ├── services/
│   │   └── SearchService.js   # Lógica de busca
│   ├── routes/
│   │   └── api.js             # Rotas da API
│   └── server.js              # Servidor HTTP
├── public/
│   ├── index.html             # Interface de busca
│   └── styles.css             # Estilos
└── package.json
```

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure o MongoDB (certifique-se que está rodando localmente na porta 27017)

4. Execute o servidor:
```bash
npm start
```

5. Acesse: http://localhost:3000

## Uso

### Indexar um Website

```bash
POST /api/websites
Content-Type: application/json

{
  "url": "https://exemplo.com",
  "title": "Exemplo",
  "description": "Site de exemplo",
  "keywords": ["exemplo", "teste", "demo"]
}
```

### Buscar Websites

```bash
GET /api/search?q=exemplo
```

## Funcionalidades

- ✅ Inserção de websites com palavras-chave
- ✅ Busca por palavras-chave
- ✅ Listagem de todos os websites
- ✅ Remoção de websites
- ✅ Atualização de websites
- ✅ Histórico de buscas
- ✅ Interface web para buscas

## Classes Implementadas

### Website
Representa um website indexado no sistema.

**Métodos:**
- `insert()` - Insere novo website
- `findByKeyword(keyword)` - Busca por palavra-chave
- `findAll()` - Lista todos os websites
- `delete(id)` - Remove um website
- `update(id, data)` - Atualiza um website

### Keyword
Gerencia palavras-chave e sua associação com websites.

**Métodos:**
- `insert()` - Insere nova palavra-chave
- `findWebsites(keyword)` - Encontra websites por palavra-chave
- `getMostSearched()` - Retorna palavras-chave mais buscadas

### Search
Registra e gerencia o histórico de buscas.

**Métodos:**
- `insert()` - Registra uma busca
- `getHistory()` - Retorna histórico de buscas
- `getPopularSearches()` - Retorna buscas mais populares
