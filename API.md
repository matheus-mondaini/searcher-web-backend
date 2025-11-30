# API (Classes JavaScript)

Documento de referência rápida para os métodos disponíveis nas três classes implementadas neste projeto.

## Website

| Método | Parâmetros | Descrição |
|--------|------------|-----------|
| `create(data)` | `{ url, title, description?, keywords? }` | Insere um novo website |
| `findAll()` | – | Retorna todos os websites cadastrados |
| `findById(id)` | `id: string` | Busca um website pelo _id |
| `update(id, updates)` | `id: string`, objeto com campos a alterar | Atualiza os dados do website |
| `delete(id)` | `id: string` | Remove o website |

### Exemplo

```javascript
import Website from './Website.js';

const website = await Website.create({
  url: 'https://utfpr.edu.br',
  title: 'UTFPR',
  keywords: ['educacao', 'tecnologia']
});

await Website.update(website._id.toString(), { title: 'UTFPR Oficial' });
const todos = await Website.findAll();
await Website.delete(website._id.toString());
```

## Keyword

| Método | Parâmetros | Descrição |
|--------|------------|-----------|
| `create(data)` | `{ word, relatedWebsites? }` | Cadastra nova palavra-chave |
| `findAll()` | – | Lista todas as palavras-chave |
| `findById(id)` | `id: string` | Busca por _id |
| `update(id, updates)` | `id: string`, objeto com campos a alterar | Atualiza palavra-chave |
| `delete(id)` | `id: string` | Exclui a palavra-chave |

### Exemplo

```javascript
import Keyword from './Keyword.js';

const registro = await Keyword.create({ word: 'nodejs' });
const lista = await Keyword.findAll();
await Keyword.delete(registro._id.toString());
```

## SearchRecord

| Método | Parâmetros | Descrição |
|--------|------------|-----------|
| `create(data)` | `{ query, resultsCount?, metadata? }` | Registra uma busca realizada |
| `findAll()` | – | Lista o histórico de buscas |
| `findById(id)` | `id: string` | Recupera uma busca específica |
| `update(id, updates)` | `id: string`, objeto com campos a alterar | Atualiza o registro de busca |
| `delete(id)` | `id: string` | Remove o registro do histórico |

### Exemplo

```javascript
import SearchRecord from './SearchRecord.js';

const busca = await SearchRecord.create({
  query: 'node.js',
  resultsCount: 3,
  metadata: { usuario: 'aluno@utfpr.br' }
});

const historico = await SearchRecord.findAll();
await SearchRecord.delete(busca._id.toString());
```

> **Observação:** Todos os métodos assumem que `database.connect()` já foi executado antes da chamada. O arquivo `app.js` mostra um exemplo completo de uso sequencial.
