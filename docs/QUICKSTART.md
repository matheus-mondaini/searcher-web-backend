# 🚀 Guia de Início Rápido - Projeto 2

## Passos para rodar o projeto

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Iniciar MongoDB

```bash
# macOS (Homebrew)
brew services start mongodb-community@7.0

# Linux (systemd)
sudo systemctl start mongod

# Windows
# Execute MongoDB Compass ou inicie o serviço pelo Services
```

### 3️⃣ (Opcional) Popular banco com dados

```bash
npm run seed
```

Isso adiciona 15 websites de exemplo (MDN, Node.js, GitHub, etc.)

### 4️⃣ Iniciar servidor

```bash
npm start
```

### 5️⃣ Acessar aplicação

Abra seu navegador em: **http://localhost:3000**

---

## 📝 Primeiro Uso

1. **Criar conta**
   - Clique em "Criar conta"
   - Preencha: nome, usuário, email e senha
   - Clique em "Criar Conta"

2. **Fazer login**
   - Use seu usuário (ou email) e senha
   - Clique em "Entrar"

3. **Usar o sistema**
   - **Dashboard:** Visão geral
   - **Buscar:** Digite uma palavra-chave (ex: "javascript")
   - **Adicionar:** Indexe um novo website
   - **Websites:** Veja todos indexados
   - **Estatísticas:** Veja dados de uso

---

## 🎯 Casos de Uso Principais

### Buscar um Website
1. Vá em "Buscar" na navegação
2. Digite: `javascript` (ou outra keyword)
3. Veja os resultados
4. Click no título para abrir o website

### Adicionar um Website
1. Vá em "Adicionar" na navegação
2. Preencha:
   - URL: `https://exemplo.com`
   - Título: `Meu Site`
   - Descrição: (opcional)
   - Keywords: `exemplo, teste, web`
3. Clique em "Indexar Website"

### Ver Estatísticas
1. Vá em "Estatísticas" na navegação
2. Veja:
   - Total de websites/buscas/keywords
   - Keywords mais usadas
   - Histórico de buscas

---

## ⚡ Atalhos Úteis

- **/** → Foca no campo de busca (quando disponível)
- **Ctrl+C** → Parar servidor
- **F5** → Recarregar página

---

## 🔧 Comandos Úteis

```bash
# Reiniciar MongoDB (se travar)
brew services restart mongodb-community@7.0

# Ver status do MongoDB
brew services list

# Parar MongoDB
brew services stop mongodb-community@7.0

# Limpar sessões (se houver problema de login)
mongosh motor_de_busca --eval "db.sessions.deleteMany({})"

# Ver logs em tempo real
tail -f logs/erros.log
```

---

## 🐛 Problemas Comuns

### Porta 3000 em uso
```bash
lsof -ti:3000 | xargs kill -9
```

### MongoDB não conecta
```bash
brew services restart mongodb-community@7.0
```

### Erro de módulo não encontrado
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentação Completa

Leia **README-PROJETO2.md** para documentação completa.

---

**Desenvolvido por:** Matheus Mondaini (2504219)  
**Projeto 2 - EC48B - UTFPR**
