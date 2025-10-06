# Instalação do MongoDB no macOS

## Opção 1: Usar Homebrew (Recomendado)

### 1. Instale o Homebrew (se ainda não tiver)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Instale o MongoDB
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
```

### 3. Inicie o MongoDB
```bash
brew services start mongodb-community@7.0
```

### 4. Verifique se está rodando
```bash
brew services list
```

Você deve ver `mongodb-community` com status `started`.

### 5. Teste a conexão
```bash
mongosh
```

---

## Opção 2: Download Direto

### 1. Baixe o MongoDB
Acesse: https://www.mongodb.com/try/download/community

Selecione:
- Version: 7.0.x (ou mais recente)
- Platform: macOS
- Package: TGZ

### 2. Extraia e configure
```bash
cd ~/Downloads
tar -zxvf mongodb-macos-*.tgz
sudo mv mongodb-macos-* /usr/local/mongodb

# Adicione ao PATH
echo 'export PATH="/usr/local/mongodb/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 3. Crie o diretório de dados
```bash
sudo mkdir -p /usr/local/var/mongodb
sudo chown -R $(whoami) /usr/local/var/mongodb
```

### 4. Inicie o MongoDB
```bash
mongod --dbpath /usr/local/var/mongodb
```

---

## Opção 3: Usar Docker (Alternativa)

Se preferir usar Docker:

### 1. Instale o Docker Desktop
Download: https://www.docker.com/products/docker-desktop

### 2. Execute o MongoDB em container
```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v ~/mongodb-data:/data/db \
  mongo:7.0
```

### 3. Verifique se está rodando
```bash
docker ps
```

### 4. Teste a conexão
```bash
docker exec -it mongodb mongosh
```

---

## Verificação Final

Após instalar por qualquer método, teste:

```bash
# Verificar versão
mongod --version

# Conectar ao MongoDB
mongosh

# No shell do MongoDB:
show dbs
exit
```

---

## Configuração para o Projeto

Depois de instalar o MongoDB, você pode:

### 1. Popular o banco de dados
```bash
cd /Users/startse/Documents/Estudos/UTFPR/back-end/projeto-1
node src/seed.js
```

### 2. Iniciar o servidor
```bash
npm start
```

### 3. Acessar a aplicação
```
http://localhost:3000
```

---

## Comandos Úteis

### Iniciar MongoDB (Homebrew)
```bash
brew services start mongodb-community@7.0
```

### Parar MongoDB (Homebrew)
```bash
brew services stop mongodb-community@7.0
```

### Reiniciar MongoDB (Homebrew)
```bash
brew services restart mongodb-community@7.0
```

### Acessar shell do MongoDB
```bash
mongosh
```

### Ver logs do MongoDB (Homebrew)
```bash
tail -f /usr/local/var/log/mongodb/mongo.log
```

---

## Troubleshooting

### Erro: "mongod: command not found"

**Solução:** MongoDB não está no PATH. Adicione:
```bash
echo 'export PATH="/usr/local/mongodb/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Erro: "Address already in use"

**Solução:** Algum processo já está usando a porta 27017:
```bash
lsof -ti:27017 | xargs kill -9
```

### Erro: "Permission denied"

**Solução:** Ajuste permissões do diretório de dados:
```bash
sudo chown -R $(whoami) /usr/local/var/mongodb
```

### MongoDB não persiste dados

**Solução:** Certifique-se de especificar o dbpath:
```bash
mongod --dbpath /usr/local/var/mongodb
```

---

## Próximos Passos

Após instalar o MongoDB:

1. ✅ Execute `node src/seed.js` para popular o banco
2. ✅ Execute `npm start` para iniciar o servidor
3. ✅ Acesse http://localhost:3000
4. ✅ Teste a busca e adicione novos websites!

---

## Recursos Adicionais

- **Documentação Oficial:** https://www.mongodb.com/docs/
- **MongoDB Compass:** Interface gráfica para MongoDB
  - Download: https://www.mongodb.com/products/compass
- **MongoDB Shell:** https://www.mongodb.com/docs/mongodb-shell/
