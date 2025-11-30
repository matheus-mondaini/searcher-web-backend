# Documentação das Classes

Esta versão simplificada do projeto contém apenas os arquivos necessários para demonstrar a biblioteca de acesso ao MongoDB.

```
┌───────────────┬──────────────────────────────────────────────┐
│ Arquivo       │ Função                                       │
├───────────────┼──────────────────────────────────────────────┤
│ database.js   │ Conexão única com o MongoDB                  │
│ logger.js     │ Registro de erros em arquivo TXT             │
│ Website.js    │ CRUD de websites                             │
│ Keyword.js    │ CRUD de palavras-chave                       │
│ SearchRecord.js│ CRUD do histórico de buscas                 │
│ app.js        │ Script de demonstração dos métodos           │
└───────────────┴──────────────────────────────────────────────┘
```

## database.js

- Mantém uma única instância do `MongoClient`.
- Métodos principais: `connect()`, `getCollection(nome)`, `objectId(id)` e `disconnect()`.
- Utiliza o `logger` para registrar falhas de conexão.

## logger.js

- Garante a existência da pasta `logs`.
- Método `logError(mensagem, error)` grava data/hora, mensagem e stack trace em `logs/erros.log`.

## Website.js

- Coleção: `websites`.
- Métodos estáticos:
  - `create(data)`
  - `findAll()`
  - `findById(id)`
  - `update(id, updates)`
  - `delete(id)`
- Normaliza keywords para letras minúsculas e atualiza `updatedAt` automaticamente.

## Keyword.js

- Coleção: `keywords`.
- Métodos estáticos:
  - `create({ word, relatedWebsites })`
  - `findAll()`
  - `findById(id)`
  - `update(id, updates)`
  - `delete(id)`
- Armazena as palavras em minúsculas e aceita a vinculação de websites relacionados.

## SearchRecord.js

- Coleção: `searches`.
- Métodos estáticos:
  - `create({ query, resultsCount, metadata })`
  - `findAll()`
  - `findById(id)`
  - `update(id, updates)`
  - `delete(id)`
- Guarda o horário da busca em `executedAt` e qualquer metadado adicional (IP, usuário etc.).

## app.js

1. Conecta ao banco com `database.connect()`.
2. Cria registros nas três classes.
3. Lista os websites cadastrados.
4. Atualiza o título do website criado.
5. Remove os registros ao final para manter o banco limpo.
6. Sempre encerra a conexão chamando `database.disconnect()`.

Use este arquivo como referência para montar seus próprios testes ou scripts.
