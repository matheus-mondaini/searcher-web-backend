# 🔍 Comandos Úteis - Biblioteca MongoDB

## 📋 Comandos do Projeto

### Instalação
```bash
# Instalar dependências
npm install
```

### Execução
```bash
# Popular banco com dados de exemplo
npm run seed

# Executar demonstração CRUD
npm start

# Desenvolvimento com auto-reload
npm run dev
```

## 📋 Comandos do MongoDB

### Instalação do MongoDB
```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community@7.0

# Iniciar MongoDB
brew services start mongodb-community@7.0

# Parar MongoDB
brew services stop mongodb-community@7.0

# Verificar status
brew services list
```

### Conectar ao MongoDB
```bash
# Conectar via mongosh
mongosh

# Conectar ao banco do projeto
mongosh motor_de_busca
```

### Comandos no MongoDB Shell

#### Visualizar Dados
```javascript
// Ver todos os websites
db.websites.find().pretty()

// Contar documentos
db.websites.countDocuments()
db.keywords.countDocuments()
db.searches.countDocuments()

// Buscar websites por keyword
db.websites.find({ keywords: "javascript" }).pretty()

// Ver keywords mais usadas
db.keywords.find().sort({ searchCount: -1 }).limit(10).pretty()

// Ver últimas buscas
db.searches.find().sort({ executedAt: -1 }).limit(10).pretty()
```

#### Manipular Dados
```javascript
// Limpar uma coleção (cuidado!)
db.websites.deleteMany({})
db.keywords.deleteMany({})
db.searches.deleteMany({})

// Deletar banco inteiro (MUITO CUIDADO!)
db.dropDatabase()

// Criar índices para melhor performance
db.websites.createIndex({ keywords: 1 })
db.websites.createIndex({ url: 1 }, { unique: true })
db.websites.createIndex({ title: "text", description: "text" })
db.keywords.createIndex({ word: 1 }, { unique: true })

// Estatísticas da coleção
db.websites.stats()

// Sair do MongoDB shell
exit
```

## 📋 Comandos de Debug

### Verificar Processos
```bash
# Ver processos Node rodando
ps aux | grep node

# Matar processo na porta específica
lsof -ti:27017 | xargs kill -9

# Ver logs do MongoDB (macOS)
tail -f /usr/local/var/log/mongodb/mongo.log
```

### Verificar Versões
```bash
# Node.js
node --version

# npm
npm --version

# MongoDB
mongod --version
mongosh --version
```

### Limpar e Reinstalar
```bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

## 📋 Comandos Git

```bash
# Ver status
git status

# Ver histórico
git log --oneline

# Ver diferenças
git diff

# Adicionar todos os arquivos
git add .

# Commit
git commit -m "mensagem"

# Push
git push origin main
```

## 📋 Comandos do Sistema

### Análise do Projeto
```bash
# Ver tamanho do projeto
du -sh .

# Contar linhas de código JavaScript
find . -name "*.js" -not -path "./node_modules/*" | xargs wc -l

# Ver estrutura de pastas
tree -L 2 -I node_modules

# Abrir no VS Code
code .
```

### Backup do Banco de Dados
```bash
# Fazer backup
mongodump --db motor_de_busca --out ~/backup-motor-busca

# Restaurar backup
mongorestore --db motor_de_busca ~/backup-motor-busca/motor_de_busca
```

## 📋 Atalhos Úteis

### Inicializar Tudo
```bash
# MongoDB + Seed + Demo
brew services start mongodb-community@7.0 && \
sleep 2 && \
npm run seed && \
npm start
```

### Resetar Banco
```bash
# Limpar e popular novamente
mongosh motor_de_busca --eval "db.dropDatabase()" && \
npm run seed
```

## 🐛 Troubleshooting

### MongoDB não conecta
```bash
# Reiniciar serviço
brew services restart mongodb-community@7.0

# Ou iniciar manualmente
mongod --config /usr/local/etc/mongod.conf
```

### Porta em uso
```bash
# Verificar o que está usando a porta
lsof -i :27017

# Matar processo
lsof -ti:27017 | xargs kill -9
```

### Erro "Cannot find module"
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### MongoDB não inicia
```bash
# Parar serviço
brew services stop mongodb-community@7.0

# Verificar permissões
sudo chown -R $(whoami) /usr/local/var/mongodb
sudo chown -R $(whoami) /usr/local/var/log/mongodb

# Iniciar novamente
brew services start mongodb-community@7.0
```

## 💡 Dicas

1. **Sempre inicie o MongoDB** antes de executar os scripts
2. **Use o seed.js** para popular com dados de exemplo
3. **Consulte logs/erros.log** quando houver problemas
4. **Faça backups** antes de modificar o banco
5. **Use índices** para melhor performance em produção

## 📚 Consultar Documentação

- **README.md** - Visão geral do projeto
- **API.md** - Referência dos métodos das classes
- **CLASSES.md** - Detalhamento das classes
- **INSTALACAO.md** - Guia de instalação completo
- **MONGODB-INSTALL.md** - Como instalar MongoDB

## 🎯 Fluxo Típico de Trabalho

```bash
# 1. Iniciar MongoDB
brew services start mongodb-community@7.0

# 2. Popular banco (primeira vez)
npm run seed

# 3. Testar a biblioteca
npm start

# 4. Desenvolver alterações
# (edite Website.js, Keyword.js, etc.)

# 5. Testar novamente
npm start

# 6. Quando terminar
brew services stop mongodb-community@7.0
```
