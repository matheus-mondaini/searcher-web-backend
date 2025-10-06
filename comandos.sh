#!/bin/bash

# ========================================
# COMANDOS ÚTEIS - MOTOR DE BUSCA
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🔍 MOTOR DE BUSCA - COMANDOS ÚTEIS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Função para exibir comandos
show_commands() {
    cat << 'EOF'

📋 COMANDOS DE INSTALAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Instalar MongoDB (Homebrew)
brew tap mongodb/brew
brew install mongodb-community@7.0

# Iniciar MongoDB
brew services start mongodb-community@7.0

# Parar MongoDB
brew services stop mongodb-community@7.0

# Status do MongoDB
brew services list

# Instalar dependências do projeto
npm install


📋 COMANDOS DO PROJETO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Popular banco de dados (primeira vez)
node src/seed.js

# Iniciar servidor
npm start

# Iniciar com auto-reload (desenvolvimento)
npm run dev

# Testar API
chmod +x test-api.sh
./test-api.sh


📋 COMANDOS DO MONGODB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Conectar ao MongoDB
mongosh

# No shell do MongoDB:
use motor_de_busca

# Ver todos os websites
db.websites.find().pretty()

# Contar websites
db.websites.countDocuments()

# Ver websites por keyword
db.websites.find({ keywords: "javascript" }).pretty()

# Ver keywords mais buscadas
db.keywords.find().sort({ searchCount: -1 }).limit(10).pretty()

# Ver histórico de buscas
db.searches.find().sort({ timestamp: -1 }).limit(10).pretty()

# Limpar coleção (cuidado!)
db.websites.deleteMany({})

# Criar índice para melhor performance
db.websites.createIndex({ keywords: 1 })
db.websites.createIndex({ title: "text", description: "text" })

# Estatísticas da coleção
db.websites.stats()

# Sair do MongoDB shell
exit


📋 COMANDOS DE TESTE COM CURL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Buscar websites
curl "http://localhost:3000/api/search?q=javascript" | json_pp

# Listar todos os websites
curl http://localhost:3000/api/websites | json_pp

# Adicionar website
curl -X POST http://localhost:3000/api/websites \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://exemplo.com",
    "title": "Exemplo",
    "description": "Site de exemplo",
    "keywords": ["exemplo", "teste"],
    "content": "Conteúdo de exemplo"
  }' | json_pp

# Buscar website por ID (substitua ID)
curl http://localhost:3000/api/websites/ID_AQUI | json_pp

# Atualizar website
curl -X PUT http://localhost:3000/api/websites/ID_AQUI \
  -H "Content-Type: application/json" \
  -d '{"title": "Novo Título"}' | json_pp

# Deletar website
curl -X DELETE http://localhost:3000/api/websites/ID_AQUI

# Registrar click
curl -X POST http://localhost:3000/api/websites/ID_AQUI/click

# Keywords populares
curl http://localhost:3000/api/keywords | json_pp

# Sugestões
curl "http://localhost:3000/api/suggestions?q=java" | json_pp

# Estatísticas
curl http://localhost:3000/api/statistics | json_pp

# Histórico de buscas
curl http://localhost:3000/api/search/history | json_pp


📋 COMANDOS DE DEBUG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Ver processos Node rodando
ps aux | grep node

# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ver logs do MongoDB
tail -f /usr/local/var/log/mongodb/mongo.log

# Verificar versão do Node
node --version

# Verificar versão do npm
npm --version

# Verificar versão do MongoDB
mongod --version

# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install


📋 COMANDOS GIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "Projeto 1 - Motor de Busca completo"

# Ver status
git status

# Ver histórico
git log --oneline

# Criar branch
git checkout -b develop


📋 COMANDOS ÚTEIS DO SISTEMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Ver tamanho do projeto
du -sh .

# Contar linhas de código
find src -name "*.js" | xargs wc -l

# Abrir no VS Code
code .

# Abrir browser
open http://localhost:3000

# Ver portas em uso
lsof -i -P -n | grep LISTEN


📋 ATALHOS PARA ESTE PROJETO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Inicializar tudo (MongoDB + Seed + Servidor)
brew services start mongodb-community@7.0 && \
sleep 2 && \
node src/seed.js && \
npm start

# Resetar banco e popular novamente
mongosh motor_de_busca --eval "db.dropDatabase()" && \
node src/seed.js

# Backup do banco de dados
mongodump --db motor_de_busca --out ~/backup-motor-busca

# Restaurar backup
mongorestore --db motor_de_busca ~/backup-motor-busca/motor_de_busca


📋 TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# MongoDB não conecta:
brew services restart mongodb-community@7.0

# Porta 3000 em uso:
lsof -ti:3000 | xargs kill -9

# Erro "Cannot find module":
rm -rf node_modules && npm install

# MongoDB não inicia:
brew services stop mongodb-community@7.0
mongod --dbpath /usr/local/var/mongodb

# Limpar tudo e recomeçar:
brew services stop mongodb-community@7.0
rm -rf /usr/local/var/mongodb/*
rm -rf node_modules
npm install
brew services start mongodb-community@7.0
node src/seed.js


📋 ANÁLISE DO CÓDIGO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Contar linhas por tipo de arquivo
echo "JavaScript:"
find . -name "*.js" -not -path "./node_modules/*" | xargs wc -l | tail -n 1

echo "HTML:"
find . -name "*.html" | xargs wc -l | tail -n 1

echo "CSS:"
find . -name "*.css" | xargs wc -l | tail -n 1

echo "Markdown:"
find . -name "*.md" | xargs wc -l | tail -n 1


📋 PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Testar tempo de resposta da API
time curl -s "http://localhost:3000/api/search?q=javascript" > /dev/null

# Benchmark de requests
ab -n 100 -c 10 "http://localhost:3000/api/websites"

# Ver uso de memória do Node
node --expose-gc src/server.js


📋 DESENVOLVIMENTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Watch mode (reinicia automaticamente)
npm run dev

# Verificar sintaxe JavaScript
node --check src/server.js

# Formatar código (se tiver prettier)
npx prettier --write "src/**/*.js"

# Lint (se tiver eslint)
npx eslint src/


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 DICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Sempre inicie o MongoDB antes do servidor
2. Use json_pp ou jq para formatar JSON no terminal
3. Mantenha o MongoDB rodando em background
4. Use o script de seed para dados de exemplo
5. Consulte API.md para detalhes dos endpoints
6. Leia CLASSES.md para entender as classes
7. Use Ctrl+C para parar o servidor
8. Acesse /api/statistics para ver o status do sistema

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EOF
}

# Exibir comandos
show_commands

# Menu interativo
echo ""
echo "Deseja executar algum comando? (s/n)"
read -r resposta

if [ "$resposta" = "s" ] || [ "$resposta" = "S" ]; then
    echo ""
    echo "Selecione uma opção:"
    echo "1) Iniciar MongoDB"
    echo "2) Popular banco de dados"
    echo "3) Iniciar servidor"
    echo "4) Testar API"
    echo "5) Abrir browser"
    echo "6) Ver estatísticas do banco"
    echo "0) Sair"
    echo ""
    read -r opcao
    
    case $opcao in
        1)
            echo "Iniciando MongoDB..."
            brew services start mongodb-community@7.0
            ;;
        2)
            echo "Populando banco de dados..."
            node src/seed.js
            ;;
        3)
            echo "Iniciando servidor..."
            npm start
            ;;
        4)
            echo "Testando API..."
            ./test-api.sh
            ;;
        5)
            echo "Abrindo browser..."
            open http://localhost:3000
            ;;
        6)
            echo "Conectando ao MongoDB..."
            mongosh motor_de_busca
            ;;
        0)
            echo "Até logo!"
            ;;
        *)
            echo "Opção inválida"
            ;;
    esac
fi
