# 📝 Análise de Requisitos - Projeto 2 EC48B

**Aluno:** Matheus Mondaini (2504219)  
**Disciplina:** EC48B - Programação Web Back-End  
**Projeto:** Motor de Busca de Websites  
**Data:** Novembro 2025

---

## 🎯 Objetivo Cumprido

Este projeto implementa uma **aplicação web completa** utilizando **Express.js** e as classes desenvolvidas no Projeto 1, atendendo **todos os requisitos** da proposta do Projeto 2.

---

## ✅ Checklist de Requisitos

### Requisitos Obrigatórios

- [x] **Express.js implementado** como framework web
- [x] **Rotas GET e POST** criadas para todas as funcionalidades
- [x] **Sessões configuradas** com Express Session + MongoDB
- [x] **Autenticação de usuários** com registro, login e logout
- [x] **Validação de campos obrigatórios** no servidor e cliente
- [x] **Mensagens de erro** específicas para cada validação
- [x] **Casos de uso da temática** (motor de busca) implementados
- [x] **Templates EJS** para interface do usuário

### Diferenciais Implementados

- [x] Design moderno e responsivo
- [x] Validações client-side além das server-side
- [x] Dashboard com estatísticas em tempo real
- [x] Histórico completo de buscas
- [x] Gráficos de keywords mais usadas
- [x] Hash de senhas com bcrypt
- [x] Proteção de rotas com middleware
- [x] Feedback visual para todas as ações
- [x] Documentação completa

---

## 📁 Estrutura do Projeto

```
projeto-1/
├── routes/               # Rotas Express
│   ├── auth.js          # Login, registro, logout
│   └── main.js          # Motor de busca
├── middleware/           # Middleware customizado
│   └── auth.js          # Proteção de rotas
├── views/                # Templates EJS (10 páginas)
├── public/               # Assets estáticos
│   ├── css/style.css    # 950+ linhas
│   └── js/main.js       # Interatividade
├── User.js               # Nova classe (autenticação)
├── server.js             # Servidor Express
└── [classes do Projeto 1]
```

---

## 🚀 Como Executar (Avaliação)

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Iniciar MongoDB
```bash
brew services start mongodb-community@7.0
```

### Passo 3: Popular Banco (opcional mas recomendado)
```bash
npm run seed
```
Isso adiciona 15 websites de exemplo para facilitar os testes.

### Passo 4: Iniciar Servidor
```bash
npm start
```

### Passo 5: Acessar
Abra o navegador em: **http://localhost:3000**

---

## 🧪 Casos de Teste

### 1. Registro de Usuário ✅
**Objetivo:** Testar criação de conta

1. Acesse http://localhost:3000
2. Clique em "Criar conta"
3. Preencha:
   - Nome: Teste Professor
   - Usuário: professor
   - Email: professor@utfpr.edu.br
   - Senha: senha123
   - Confirmar Senha: senha123
4. Clique em "Criar Conta"

**Resultado esperado:**
- Usuário é criado
- Senha é criptografada (bcrypt)
- Usuário é automaticamente logado
- Redirecionado para dashboard

**Validações testadas:**
- Campos obrigatórios
- Formato de email
- Tamanho mínimo de senha (6 caracteres)
- Confirmação de senha
- Username único
- Email único

### 2. Login ✅
**Objetivo:** Testar autenticação

1. Se estiver logado, faça logout
2. Acesse /login
3. Insira:
   - Usuário: professor (ou professor@utfpr.edu.br)
   - Senha: senha123
4. Clique em "Entrar"

**Resultado esperado:**
- Credenciais são validadas
- Sessão é criada
- Redirecionado para dashboard

**Validações testadas:**
- Login com username
- Login com email
- Verificação de senha (bcrypt)
- Mensagens de erro para credenciais inválidas

### 3. Buscar Website ✅
**Objetivo:** Testar funcionalidade de busca

1. No dashboard, clique em "Buscar"
2. Digite: `javascript`
3. Clique em "Buscar"

**Resultado esperado:**
- Busca em keywords, título e descrição
- Exibe resultados ordenados
- Registra busca no histórico
- Exibe mensagem se não houver resultados

**Validações testadas:**
- Campo obrigatório (busca vazia)
- Busca case-insensitive
- Registro automático de busca

### 4. Adicionar Website ✅
**Objetivo:** Testar adição de website

1. Clique em "Adicionar" no menu
2. Preencha:
   - URL: https://nodejs.org
   - Título: Node.js Official
   - Descrição: Runtime JavaScript
   - Keywords: nodejs, javascript, backend
3. Clique em "Indexar Website"

**Resultado esperado:**
- Website é adicionado ao banco
- Keywords são processadas e vinculadas
- Mensagem de sucesso é exibida
- Dados do formulário são limpos

**Validações testadas:**
- URL obrigatória
- Título obrigatório
- Formato de URL (http/https)
- Keywords separadas por vírgula
- URL única

### 5. Ver Estatísticas ✅
**Objetivo:** Testar página de estatísticas

1. Clique em "Estatísticas" no menu

**Resultado esperado:**
- Total de websites exibido
- Total de buscas exibido
- Total de keywords exibido
- Gráfico de top 10 keywords
- Tabela de histórico de buscas

### 6. Proteção de Rotas ✅
**Objetivo:** Testar middleware de autenticação

1. Faça logout
2. Tente acessar diretamente: http://localhost:3000/dashboard

**Resultado esperado:**
- Usuário é redirecionado para /login
- Após login, é redirecionado de volta para /dashboard

### 7. Validações de Erro ✅
**Objetivo:** Testar mensagens de erro

**Teste 7.1: Registro com email inválido**
1. Acesse /register
2. Digite email: `invalido`
3. Tente enviar

**Resultado:** Mensagem de erro "Email inválido"

**Teste 7.2: Senhas não coincidem**
1. Digite senha: `senha123`
2. Digite confirmação: `senha456`
3. Tente enviar

**Resultado:** Mensagem "As senhas não coincidem"

**Teste 7.3: Username duplicado**
1. Tente criar conta com username já existente

**Resultado:** Mensagem "Nome de usuário já está em uso"

---

## 📊 Rotas Implementadas

### GET
| Rota | Descrição | Autenticação |
|------|-----------|--------------|
| / | Redireciona para dashboard | Opcional |
| /login | Formulário de login | Apenas guest |
| /register | Formulário de registro | Apenas guest |
| /logout | Encerra sessão | Não |
| /dashboard | Dashboard principal | Requerida |
| /search | Página de busca | Requerida |
| /websites | Lista websites | Requerida |
| /websites/add | Formulário adicionar | Requerida |
| /statistics | Estatísticas | Requerida |

### POST
| Rota | Descrição | Autenticação |
|------|-----------|--------------|
| /login | Processa login | Apenas guest |
| /register | Processa registro | Apenas guest |
| /logout | Encerra sessão | Não |
| /websites/add | Adiciona website | Requerida |

---

## 🔒 Segurança Implementada

1. **Senhas Criptografadas**
   - Algoritmo: bcrypt
   - Salt rounds: 10
   - Nunca armazenadas em texto plano

2. **Sessões Seguras**
   - Armazenamento: MongoDB (não memória)
   - httpOnly: true (previne XSS)
   - Tempo de expiração: 24 horas
   - Secret configurável

3. **Validações**
   - Server-side: Todas as rotas POST
   - Client-side: JavaScript + HTML5
   - Mensagens específicas sem expor sistema

4. **Proteção de Rotas**
   - Middleware `requireAuth` para rotas privadas
   - Middleware `requireGuest` para login/register
   - Redirecionamento automático

---

## 📚 Documentação Criada

1. **README-PROJETO2.md** (500+ linhas)
   - Instalação completa
   - Todas as funcionalidades
   - Troubleshooting
   - Exemplos de uso

2. **QUICKSTART.md**
   - 5 passos para executar
   - Casos de uso principais
   - Comandos úteis

3. **RESUMO-PROJETO2.md**
   - Checklist de requisitos
   - Estatísticas do código
   - Conceitos demonstrados

4. **IMPLEMENTACAO-COMPLETA.md**
   - Status da implementação
   - Próximos passos
   - Suporte

---

## 💻 Tecnologias Utilizadas

### Backend
- Node.js 18+
- Express.js 4.18
- MongoDB 6+
- bcryptjs (hash de senhas)
- express-session (sessões)
- connect-mongo (armazenamento de sessões)
- EJS (template engine)

### Frontend
- HTML5
- CSS3 puro
- JavaScript vanilla

### Banco de Dados
- MongoDB (5 coleções)
- Índices únicos
- Relacionamento de dados

---

## 📈 Estatísticas do Projeto

- **Linhas de código:** ~4500
- **Arquivos criados:** 20+
- **Rotas:** 14
- **Views:** 10
- **Validações:** 15+
- **Mensagens de erro:** 20+
- **Desenvolvimento Final:** Projeto 2 completo

---

## 🎨 Interface

- ✅ Design moderno e profissional
- ✅ Responsivo (mobile-first)
- ✅ Animações suaves
- ✅ Feedback visual
- ✅ Alertas auto-dismiss
- ✅ Estados vazios
- ✅ Toast notifications

---

## 🔄 Evolução Projeto 1 → Projeto 2

### Mantido do Projeto 1
- ✅ 3 classes com CRUD (Website, Keyword, SearchRecord)
- ✅ Classe Database (Singleton)
- ✅ Logger de erros
- ✅ Temática (motor de busca)
- ✅ Script de seed

### Adicionado no Projeto 2
- ✅ Servidor Express.js
- ✅ Classe User (autenticação)
- ✅ 14 rotas (GET/POST)
- ✅ 10 views EJS
- ✅ Middleware de autenticação
- ✅ Sistema de sessões
- ✅ Interface web completa
- ✅ CSS responsivo
- ✅ JavaScript de interatividade
- ✅ Validações duplas

---

## ✨ Diferenciais

1. **Código Limpo**
   - Comentários em todas as funções
   - Organização em módulos
   - Boas práticas seguidas

2. **Documentação**
   - 4 arquivos de documentação
   - Comentários no código
   - Exemplos de uso

3. **UX/UI**
   - Design profissional
   - Feedback para todas ações
   - Estados vazios tratados

4. **Segurança**
   - Bcrypt com 10 salt rounds
   - Sessões em MongoDB
   - Validações duplas

5. **Funcionalidades Extras**
   - Dashboard interativo
   - Gráficos de estatísticas
   - Histórico detalhado

---

## 📞 Contato

**Matheus Mondaini**  
RA: 2504219  
Email: [seu-email]  
GitHub: matheus-mondaini

---

## ✅ Conclusão

Este projeto demonstra:
- ✅ Domínio do Express.js
- ✅ Implementação de autenticação
- ✅ Uso correto de sessões
- ✅ Validações completas
- ✅ Organização de código
- ✅ Documentação detalhada
- ✅ Design profissional

**Status:** Pronto para avaliação  
**Requisitos:** 100% atendidos  
**Extras:** Múltiplos diferenciais
