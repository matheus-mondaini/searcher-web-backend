# Projeto 2

## 🚀 Inicialização

### 1. Instalar MongoDB

```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

Consulte `MONGODB-INSTALL.md` para outros sistemas operacionais.

### 2. Criar arquivo .env (opcional)

```bash
cp .env.example .env
```

O arquivo já está configurado com valores padrão que funcionam localmente.

### 3. Popular banco de dados (opcional)

```bash
npm run seed
```

Isso adiciona 15 websites de exemplo ao banco.

### 4. Iniciar servidor

```bash
npm start
```

### 5. Acessar aplicação

Abra seu navegador em: **http://localhost:3000**

---

## 📋 Funcionalidades Implementadas

### 🔐 Autenticação
- [x] Registro de usuários
- [x] Login (username ou email)
- [x] Logout
- [x] Hash de senhas (bcrypt)
- [x] Sessões seguras (MongoDB)
- [x] Proteção de rotas
- [x] Validações completas

### 🔍 Motor de Busca
- [x] Buscar websites por keyword
- [x] Adicionar websites
- [x] Listar todos websites
- [x] Ver estatísticas
- [x] Dashboard interativo
- [x] Histórico de buscas

### ✅ Validações
- [x] Server-side (todas as rotas)
- [x] Client-side (JavaScript)
- [x] Mensagens de erro específicas
- [x] Feedback visual

### 🎨 Interface
- [x] Design moderno e responsivo
- [x] 10 páginas completas
- [x] CSS personalizado (950+ linhas)
- [x] Animações e transições
- [x] Estados vazios

---

## 📊 Requisitos do Projeto 2

| Requisito | Status |
|-----------|--------|
| Express.js | ✅ Implementado |
| Rotas GET/POST | ✅ 14 rotas |
| Sessões | ✅ Express Session + MongoDB |
| Autenticação | ✅ Completa com bcrypt |
| Validação de campos | ✅ Cliente + Servidor |
| Mensagens de erro | ✅ Específicas |
| Casos de uso | ✅ Todos implementados |
| Templates | ✅ 10 views EJS |

---

## 📚 Documentação

Leia os arquivos de documentação criados:

1. **README-PROJETO2.md** - Documentação completa com:
   - Instalação passo a passo
   - Todas as funcionalidades
   - Estrutura do projeto
   - Troubleshooting
   - Segurança implementada

2. **QUICKSTART.md** - Guia de início rápido:
   - 5 passos para rodar
   - Casos de uso principais
   - Atalhos úteis
   - Problemas comuns

3. **RESUMO-PROJETO2.md** - Resumo da implementação:
   - Checklist de requisitos
   - Estatísticas do código
   - Conceitos demonstrados
   - Diferenciais

---

## 🧪 Testando o Sistema

### 1. Primeiro, inicie o MongoDB
```bash
brew services start mongodb-community@7.0
```

### 2. Inicie o servidor
```bash
npm start
```

### 3. Crie uma conta
- Acesse http://localhost:3000
- Clique em "Criar conta"
- Preencha os dados
- Clique em "Criar Conta"

### 4. Teste as funcionalidades
- **Buscar:** Digite "javascript" na busca
- **Adicionar:** Adicione um website novo
- **Estatísticas:** Veja os dados de uso
- **Dashboard:** Visão geral do sistema

---

## 🎯 Casos de Uso Implementados

### ✅ UC01: Registro de Usuário
1. Usuário acessa /register
2. Preenche formulário (nome, username, email, senha)
3. Sistema valida dados
4. Sistema cria conta com senha criptografada
5. Usuário é automaticamente logado

### ✅ UC02: Login
1. Usuário acessa /login
2. Insere username/email e senha
3. Sistema valida credenciais
4. Sistema cria sessão
5. Usuário é redirecionado ao dashboard

### ✅ UC03: Buscar Website
1. Usuário acessa /search
2. Digita termo de busca
3. Sistema busca em keywords/título/descrição
4. Sistema registra busca no histórico
5. Sistema exibe resultados

### ✅ UC04: Adicionar Website
1. Usuário acessa /websites/add
2. Preenche formulário (URL, título, descrição, keywords)
3. Sistema valida dados
4. Sistema cria website
5. Sistema atualiza keywords
6. Exibe mensagem de sucesso

### ✅ UC05: Ver Estatísticas
1. Usuário acessa /statistics
2. Sistema coleta dados
3. Sistema exibe:
   - Total de websites/buscas/keywords
   - Top 10 keywords
   - Histórico de buscas

---

## 🔒 Segurança

### Implementada
- ✅ Senhas com hash bcrypt (10 rounds)
- ✅ Sessões em MongoDB (não em memória)
- ✅ Cookies httpOnly (previne XSS)
- ✅ Secret configurável
- ✅ Validações duplas (cliente + servidor)
- ✅ Middleware de autenticação
- ✅ Tratamento de erros sem expor dados

---

## 💡 Destaques

### Design
- Interface moderna e profissional
- Totalmente responsivo (funciona em mobile)
- Cores consistentes (tema azul/verde)
- Animações suaves

### Código
- Organizado em módulos
- Comentado e documentado
- Boas práticas seguidas
- Tratamento de erros robusto

### UX
- Feedback visual para todas ações
- Alertas auto-dismiss
- Validações em tempo real
- Mensagens de erro claras

---

## 📞 Suporte

Se encontrar problemas:

1. **MongoDB não conecta:**
   ```bash
   brew services restart mongodb-community@7.0
   ```

2. **Porta 3000 em uso:**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

3. **Erro de módulo:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Problema de sessão:**
   ```bash
   mongosh motor_de_busca --eval "db.sessions.deleteMany({})"
   ```

---

## ✨ Conclusão

O **Projeto 2** está **100% implementado** e pronto para uso!

### O que fazer agora:
1. ✅ Instalar MongoDB
2. ✅ Rodar `npm start`
3. ✅ Acessar http://localhost:3000
4. ✅ Criar uma conta
5. ✅ Testar todas as funcionalidades

### Documentação disponível:
- README-PROJETO2.md (completa)
- QUICKSTART.md (início rápido)
- RESUMO-PROJETO2.md (resumo)
- Código comentado

---

**Desenvolvido por:** Matheus Mondaini (2504219)  
**Disciplina:** EC48B - Programação Web Back-End  
**Instituição:** UTFPR  
**Projeto:** Motor de Busca de Websites  
**Status:** ✅ Concluído (Projeto 1 + Projeto 2)
