# Motor de Busca de Websites - Projeto 2 EC48B

Sistema completo de busca e armazenamento de websites com autenticação de usuários, desenvolvido com **Express.js** e **MongoDB**.

## 📋 Sobre o Projeto

**Projeto 2** da disciplina **EC48B - Programação Web Back-End** da UTFPR. Este projeto é uma evolução do Projeto 1, adicionando:

- 🔐 Sistema de autenticação com login e registro
- 🌐 Interface web completa com templates EJS
- 🔍 Funcionalidades de busca interativas
- 📊 Dashboard com estatísticas
- ✅ Validação de formulários (cliente e servidor)
- 🔒 Sessões seguras com Express Session

## 👨‍💻 Informações Acadêmicas

- **Aluno:** Matheus Mondaini (2504219)
- **Disciplina:** EC48B - Programação Web Back-End
- **Instituição:** UTFPR (Universidade Tecnológica Federal do Paraná)
- **Professor:** Monique Emídio de Oliveira / Willian Massami Watanabe
- **Período:** 2025

## 🎯 Temática

**Motor de Busca de Websites** - Similar ao Google, permite:
- Indexar websites com título, URL, descrição e palavras-chave
- Buscar websites por keywords, título ou descrição
- Visualizar estatísticas de uso
- Gerenciar websites indexados

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** (v18+) - Runtime JavaScript
- **Express.js** (v4.18) - Framework web
- **MongoDB** (v6+) - Banco de dados NoSQL
- **Express Session** - Gerenciamento de sessões
- **bcryptjs** - Hash de senhas
- **EJS** - Template engine

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização (sem frameworks)
- **JavaScript** - Interatividade (vanilla)

## 📁 Estrutura do Projeto

```
projeto-1/
├── routes/
│   ├── auth.js           # Rotas de autenticação (login, register, logout)
│   └── main.js           # Rotas principais (dashboard, search, websites)
├── middleware/
│   └── auth.js           # Middleware de autenticação
├── views/
│   ├── login.ejs         # Página de login
│   ├── register.ejs      # Página de registro
│   ├── dashboard.ejs     # Dashboard principal
│   ├── search.ejs        # Página de busca
│   ├── websites.ejs      # Lista de websites
│   ├── add-website.ejs   # Formulário de adição
│   ├── statistics.ejs    # Estatísticas
│   ├── 404.ejs           # Página de erro 404
│   └── error.ejs         # Página de erro 500
├── public/
│   ├── css/
│   │   └── style.css     # Estilos CSS
│   └── js/
│       └── main.js       # JavaScript do frontend
├── User.js               # Classe User (autenticação)
├── Website.js            # Classe Website (CRUD)
├── Keyword.js            # Classe Keyword (CRUD)
├── SearchRecord.js       # Classe SearchRecord (CRUD)
├── database.js           # Conexão MongoDB (Singleton)
├── logger.js             # Logger de erros
├── server.js             # Servidor Express
├── app.js                # Script de teste (Projeto 1)
├── seed.js               # Popular banco com dados
├── package.json          # Dependências npm
└── .env.example          # Variáveis de ambiente (exemplo)
```

## 📦 Instalação

### 1. Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** 18+ → [Download](https://nodejs.org/)
- **MongoDB** 6+ → [Guia de instalação](MONGODB-INSTALL.md)

### 2. Clone o repositório

```bash
git clone https://github.com/matheus-mondaini/searcher-web-backend.git
cd searcher-web-backend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` se necessário (padrões funcionam localmente).

### 5. Inicie o MongoDB

```bash
# macOS (Homebrew)
brew services start mongodb-community@7.0

# Ou manualmente
mongod --dbpath ~/data/db
```

### 6. (Opcional) Popular banco com dados de exemplo

```bash
npm run seed
```

Isso adiciona 15 websites reais de desenvolvimento (MDN, Node.js, GitHub, etc).

### 7. Inicie o servidor

```bash
npm start
```

Ou, para desenvolvimento com auto-reload:

```bash
npm run dev
```

### 8. Acesse a aplicação

Abra seu navegador em:

```
http://localhost:3000
```

## 🔑 Primeiro Acesso

1. Acesse `http://localhost:3000`
2. Clique em **"Criar conta"**
3. Preencha os dados:
   - Nome completo
   - Nome de usuário (único)
   - Email (único)
   - Senha (mínimo 6 caracteres)
4. Faça login com suas credenciais

## 📚 Funcionalidades Implementadas

### ✅ Autenticação de Usuários

- **Registro de Usuário**
  - Validação de campos obrigatórios
  - Validação de formato de email
  - Senha mínima de 6 caracteres
  - Confirmação de senha
  - Hash seguro de senhas com bcrypt
  - Username e email únicos

- **Login**
  - Autenticação por username ou email
  - Verificação de senha com bcrypt
  - Criação de sessão segura
  - Mensagens de erro específicas

- **Logout**
  - Encerramento de sessão
  - Redirecionamento para login

- **Proteção de Rotas**
  - Middleware `requireAuth` protege rotas privadas
  - Middleware `requireGuest` protege rotas de login/register
  - Redirecionamento automático para login se não autenticado

### ✅ Motor de Busca

- **Dashboard**
  - Estatísticas gerais (websites, buscas, keywords)
  - Websites recentes
  - Histórico de buscas
  - Ações rápidas

- **Buscar Websites**
  - Busca por keyword, título ou descrição
  - Resultados com destaque
  - Sugestões de busca
  - Registro automático do histórico

- **Adicionar Website**
  - Formulário completo com validações
  - Campos: URL, título, descrição, keywords
  - Validação de URL (formato http/https)
  - Campos obrigatórios: URL e título
  - Keywords separadas por vírgula
  - Atualização automática de keywords

- **Listar Websites**
  - Grid responsivo de websites
  - Click nos websites abre em nova aba
  - Click nas keywords executa busca
  - Data de indexação

- **Estatísticas**
  - Total de websites, buscas e keywords
  - Top 10 keywords mais usadas (gráfico de barras)
  - Histórico detalhado de buscas
  - Tabela com data, hora e usuário

### ✅ Validações

**Servidor (Backend):**
- Campos obrigatórios
- Formato de email
- Tamanho mínimo de senha
- Confirmação de senha
- URL válida (http/https)
- Username/email únicos
- Tratamento de erros com mensagens específicas

**Cliente (Frontend):**
- Validação HTML5 (required, type, pattern)
- Validação JavaScript personalizada
- Feedback visual instantâneo
- Confirmação de logout
- Prevenção de saída com alterações não salvas

### ✅ Sessões

- Armazenamento em MongoDB (connect-mongo)
- Tempo de expiração: 24 horas
- Cookie httpOnly (segurança)
- Secret configurável via .env
- Informações do usuário disponíveis em todas as views

## 🎨 Interface

- Design moderno e profissional
- Totalmente responsivo (mobile-first)
- Cores consistentes (tema azul/verde)
- Animações suaves
- Feedback visual para todas as ações
- Alertas auto-dismiss (5 segundos)
- Toast notifications
- Estados vazios com CTAs

## 🧪 Scripts Disponíveis

```bash
# Iniciar servidor (produção)
npm start

# Iniciar servidor (desenvolvimento com auto-reload)
npm run dev

# Popular banco de dados
npm run seed

# Testar classes do Projeto 1
npm run test
```

## 📊 Coleções MongoDB

### `users`
```javascript
{
  _id: ObjectId,
  username: String (único),
  email: String (único),
  password: String (hash bcrypt),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### `websites`
```javascript
{
  _id: ObjectId,
  url: String (único),
  title: String,
  description: String,
  keywords: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### `keywords`
```javascript
{
  _id: ObjectId,
  word: String (único, lowercase),
  relatedWebsites: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### `searches`
```javascript
{
  _id: ObjectId,
  query: String (lowercase),
  resultsCount: Number,
  executedAt: Date,
  metadata: {
    userId: String,
    username: String
  }
}
```

### `sessions`
```javascript
{
  _id: String,
  expires: Date,
  session: {
    cookie: Object,
    userId: String,
    user: Object
  }
}
```

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt (salt rounds: 10)
- ✅ Sessões armazenadas no MongoDB
- ✅ Cookies httpOnly (previne XSS)
- ✅ Secret configurável (não hardcoded)
- ✅ Validações client-side e server-side
- ✅ Proteção contra SQL Injection (NoSQL)
- ✅ Tratamento de erros sem expor informações sensíveis

## 📝 Requisitos Atendidos (Projeto 2)

| Requisito | Status | Implementação |
|-----------|--------|---------------|
| **Express.js** | ✅ | Framework principal do projeto |
| **Rotas GET/POST** | ✅ | Todas as rotas implementadas |
| **Sessões** | ✅ | Express Session + MongoDB |
| **Autenticação** | ✅ | Login, registro, logout completos |
| **Validação de campos** | ✅ | Cliente e servidor |
| **Mensagens de erro** | ✅ | Específicas para cada validação |
| **Casos de uso da temática** | ✅ | Buscar, adicionar, listar, estatísticas |
| **Templates ou API** | ✅ | Templates EJS |
| **Mesma equipe/temática do Projeto 1** | ✅ | Motor de busca mantido |

## 🐛 Troubleshooting

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
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Address already in use" (porta 3000)
**Solução:** Mate o processo na porta 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

Ou altere a porta no `.env`:
```
PORT=3001
```

### Erro de sessão
**Solução:** Limpe as sessões no MongoDB:
```bash
mongosh motor_de_busca --eval "db.sessions.deleteMany({})"
```

## 🔄 Diferenças Projeto 1 → Projeto 2

| Aspecto | Projeto 1 | Projeto 2 |
|---------|-----------|-----------|
| **Interface** | ❌ Apenas scripts CLI | ✅ Interface web completa |
| **Autenticação** | ❌ Não implementada | ✅ Login/registro/logout |
| **Rotas HTTP** | ❌ Não permitido | ✅ Express.js com rotas |
| **Sessões** | ❌ Não implementada | ✅ Express Session |
| **Validações** | ✅ Básicas | ✅ Completas (cliente + servidor) |
| **Templates** | ❌ Não tinha | ✅ EJS templates |
| **Casos de uso** | ✅ CRUD classes | ✅ Fluxos completos |


## 📖 Documentação

### Projeto 2 (Web App)
- [Documentação Completa](docs/PROJETO-2.md)
- [Guia Rápido (Quickstart)](docs/QUICKSTART.md)
- [Resumo do Projeto](docs/RESUMO-PROJETO-2.md)
- [Análise de Requisitos](docs/ANALISE-REQUISITOS.md)

### Projeto 1 (Biblioteca MongoDB)
- [README do Projeto 1](docs/projeto-1/README.md)
- [API das Classes](docs/projeto-1/API.md)
- [Detalhamento das Classes](docs/projeto-1/CLASSES.md)
- [Comandos Úteis](docs/projeto-1/COMANDOS.md)
- [Guia de Instalação](docs/projeto-1/INSTALACAO.md)
- [Instalação do MongoDB](docs/projeto-1/MONGODB-INSTALL.md)
- [Estrutura do Projeto 1](docs/projeto-1/ESTRUTURA.md)

> **Nota:** As classes `Website`, `Keyword` e `SearchRecord` utilizadas no Projeto 2 são documentadas tecnicamente nos arquivos do Projeto 1. Consulte a documentação do Projeto 1 para detalhes de métodos, exemplos e comandos avançados.

## 🎓 Aprendizados Demonstrados

### Backend
- Express.js (rotas, middleware, templates)
- Autenticação e autorização
- Sessões e cookies
- Criptografia de senhas (bcrypt)
- Validações server-side
- Tratamento de erros

### Frontend
- Templates EJS
- CSS responsivo
- Validações client-side
- JavaScript vanilla (sem frameworks)
- UX/UI design

### Banco de Dados
- MongoDB (NoSQL)
- Relacionamento de dados
- Índices únicos
- Queries complexas

### Arquitetura
- MVC (Model-View-Controller)
- Separação de responsabilidades
- Middleware pattern
- Singleton pattern (database)

## 🏆 Créditos

**Desenvolvido por:** Matheus Mondaini (2504219)  
**Disciplina:** EC48B - Programação Web Back-End  
**Instituição:** UTFPR - Universidade Tecnológica Federal do Paraná  
**Professores:** Monique Emídio de Oliveira / Willian Massami Watanabe  
**Ano:** 2025

## 📄 Licença

Este projeto é acadêmico e está disponível apenas para fins educacionais.

---

**Projeto 2 - Motor de Busca de Websites**  
✅ **100% dos requisitos implementados**  
🎯 **Interface profissional e responsiva**  
🔐 **Sistema de autenticação completo**  
📊 **Estatísticas e dashboard interativo**
