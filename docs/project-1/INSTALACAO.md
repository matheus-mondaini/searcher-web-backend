# Guia de Instalação e Execução

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
  - Download: https://nodejs.org/
  - Verifique: `node --version`

- **MongoDB** (versão 6 ou superior)
  - Download: https://www.mongodb.com/try/download/community
  - Verifique: `mongod --version`

## Instalação

### 1. Clone ou baixe o projeto

```bash
cd /Users/startse/Documents/Estudos/UTFPR/back-end/projeto-1
```

### 2. Instale as dependências

```bash
npm install
```

Isso instalará:
- `mongodb` - Driver oficial do MongoDB para Node.js

### 3. Inicie o MongoDB

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Ou manualmente:**
```bash
mongod --dbpath ~/data/db
```

**Verifique se o MongoDB está rodando:**
```bash
mongosh
# Você deve ver o shell do MongoDB
```

## Execução

### 1. Popular o banco de dados (primeira vez)

Execute o script de seed para adicionar websites de exemplo:

```bash
node src/seed.js
```

Você verá uma saída como:
```
🌱 Iniciando população do banco de dados...

✅ Indexado: MDN Web Docs
✅ Indexado: Node.js
✅ Indexado: MongoDB
...

✨ Banco de dados populado com sucesso!
```

### 2. Iniciar o servidor

```bash
npm start
```

Ou, para desenvolvimento com auto-reload:
```bash
npm run dev
```

Você verá:
```
✅ Conectado ao MongoDB com sucesso!
╔═══════════════════════════════════════════════════════╗
║       MOTOR DE BUSCA - Sistema de Busca Web          ║
║                                                       ║
║  Projeto 1 - EC48B - Programação Web Back-End        ║
║  Aluno: Matheus Mondaini (2504219)                   ║
╚═══════════════════════════════════════════════════════╝

🚀 Servidor rodando em: http://localhost:3000
...
```

### 3. Acessar a aplicação

Abra seu navegador e acesse:

```
http://localhost:3000
```

## Testando a API

### Usando curl (Terminal)

**Buscar websites:**
```bash
curl "http://localhost:3000/api/search?q=javascript"
```

**Adicionar website:**
```bash
curl -X POST http://localhost:3000/api/websites \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://exemplo.com.br",
    "title": "Meu Website",
    "description": "Um site de teste",
    "keywords": ["teste", "exemplo", "web"],
    "content": "Conteúdo do website..."
  }'
```

**Listar todos os websites:**
```bash
curl http://localhost:3000/api/websites
```

**Ver estatísticas:**
```bash
curl http://localhost:3000/api/statistics
```

### Usando a Interface Web

1. Acesse `http://localhost:3000`
2. Digite um termo de busca (ex: "javascript")
3. Clique em "Buscar"
4. Veja os resultados ordenados por relevância

Para adicionar um novo website:
1. Clique em "➕ Adicionar Website"
2. Preencha o formulário
3. Clique em "Indexar Website"

## Estrutura do Banco de Dados

O MongoDB criará automaticamente o banco `motor_de_busca` com as seguintes coleções:

- **websites** - Armazena os websites indexados
- **keywords** - Armazena palavras-chave e suas estatísticas
- **searches** - Armazena o histórico de buscas

## Verificando o Banco de Dados

Para visualizar os dados no MongoDB:

```bash
mongosh

use motor_de_busca

# Ver todos os websites
db.websites.find().pretty()

# Ver palavras-chave mais buscadas
db.keywords.find().sort({ searchCount: -1 }).limit(10)

# Ver histórico de buscas
db.searches.find().sort({ timestamp: -1 }).limit(10)

# Contar documentos
db.websites.countDocuments()
db.searches.countDocuments()
```

## Parando o Servidor

Para parar o servidor, pressione:
```
Ctrl + C
```

O servidor fechará a conexão com o MongoDB graciosamente.

## Troubleshooting

### Erro: "Banco de dados não conectado"

**Solução:** Certifique-se de que o MongoDB está rodando:
```bash
brew services list
# ou
ps aux | grep mongod
```

### Erro: "Cannot find module"

**Solução:** Reinstale as dependências:
```bash
rm -rf node_modules
npm install
```

### Erro: "Address already in use"

**Solução:** Algum processo está usando a porta 3000. Mate o processo:
```bash
lsof -ti:3000 | xargs kill -9
```

Ou edite `src/server.js` e mude a porta:
```javascript
const PORT = 3001; // ou outra porta
```

### MongoDB não inicia

**Solução:** Crie o diretório de dados:
```bash
mkdir -p ~/data/db
mongod --dbpath ~/data/db
```

## Scripts Disponíveis

```bash
npm start      # Inicia o servidor
npm run dev    # Inicia com auto-reload
node src/seed.js  # Popula o banco de dados
```


## Suporte

Para mais informações, consulte:
- `README.md` - Documentação geral do projeto
- `API.md` - Documentação completa da API
- Código fonte em `src/` - Todos os arquivos estão comentados
