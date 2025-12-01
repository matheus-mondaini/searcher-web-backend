┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│      🔍 BIBLIOTECA DE ACESSO AO MONGODB - PROJETO EC48B 🔍         │
│                                                                      │
│           Projeto 1 (Recuperação) - Programação Web Back-End        │
│            Matheus Mondaini (2504219) - UTFPR - 2025               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

📁 ESTRUTURA DO PROJETO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

projeto-1/
│
├── 📄 database.js .................... Singleton de conexão MongoDB
├── 📄 logger.js ...................... Log de erros em TXT
│
├── 📄 Website.js ..................... Classe 1 - CRUD de websites
├── 📄 Keyword.js ..................... Classe 2 - CRUD de keywords
├── 📄 SearchRecord.js ................ Classe 3 - CRUD de buscas
│
├── 📄 app.js ......................... Script de demonstração
├── 📄 seed.js ........................ Script de população do BD
│
├── 📂 logs/ .......................... Pasta de logs
│   └── erros.log .................... Registro de erros
│
├── 📄 package.json ................... Configuração npm
├── 📄 package-lock.json
├── 📄 .gitignore
│
├── 📖 README.md ...................... Documentação principal
├── 📖 INSTALACAO.md .................. Guia de instalação
├── 📖 API.md ......................... Referência de métodos
├── 📖 CLASSES.md ..................... Documentação das classes
├── 📖 COMANDOS.md .................... Comandos úteis
├── 📖 MONGODB-INSTALL.md ............. Como instalar MongoDB
└── 📖 VERIFICACAO-REQUISITOS.md ...... Conformidade com requisitos


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️  TECNOLOGIAS UTILIZADAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ Node.js v18+ (ES Modules)
  ✅ MongoDB v6+ (NoSQL)
  ✅ Driver MongoDB oficial (única dependência)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 DEPENDÊNCIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "dependencies": {
    "mongodb": "^6.3.0"  ← Único pacote externo
  }


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 TEMÁTICA: MOTOR DE BUSCA DE WEBSITES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sistema de busca e armazenamento de websites baseado em palavras-chave
(similar ao Google, porém simplificado)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗄️  BANCO DE DADOS (MongoDB)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Database: motor_de_busca

Collections:

  📊 websites (Sites Indexados)
     ├─ _id: ObjectId
     ├─ url: String (único)
     ├─ title: String
     ├─ description: String
     ├─ keywords: Array<String>
     ├─ createdAt: Date
     └─ updatedAt: Date

  📊 keywords (Palavras-chave)
     ├─ _id: ObjectId
     ├─ word: String (único, lowercase)
     ├─ relatedWebsites: Array<String>
     ├─ createdAt: Date
     └─ updatedAt: Date

  📊 searches (Histórico de Buscas)
     ├─ _id: ObjectId
     ├─ query: String (lowercase)
     ├─ resultsCount: Number
     ├─ executedAt: Date
     └─ metadata: Object


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 CLASSES IMPLEMENTADAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔷 Database (Singleton)
   ├─ connect() ...................... Conecta ao MongoDB
   ├─ getCollection(name) ............ Retorna coleção
   ├─ objectId(id) ................... Cria ObjectId
   └─ disconnect() ................... Fecha conexão

🔷 Logger
   └─ logError(message, error) ....... Grava erro em logs/erros.log

🔷 Website (Classe 1)
   ├─ create(data) ................... Inserir website
   ├─ findAll() ...................... Listar todos
   ├─ findById(id) ................... Buscar por ID
   ├─ update(id, updates) ............ Atualizar
   └─ delete(id) ..................... Deletar

🔷 Keyword (Classe 2)
   ├─ create(data) ................... Inserir keyword
   ├─ findAll() ...................... Listar todas
   ├─ findById(id) ................... Buscar por ID
   ├─ update(id, updates) ............ Atualizar
   └─ delete(id) ..................... Deletar

🔷 SearchRecord (Classe 3)
   ├─ create(data) ................... Registrar busca
   ├─ findAll() ...................... Listar histórico
   ├─ findById(id) ................... Buscar por ID
   ├─ update(id, updates) ............ Atualizar
   └─ delete(id) ..................... Deletar


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 COMO EXECUTAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣  Instalar dependências:
    npm install

2️⃣  Iniciar MongoDB:
    brew services start mongodb-community@7.0

3️⃣  Popular banco de dados (opcional):
    npm run seed

4️⃣  Executar demonstração:
    npm start


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 CONCEITOS DEMONSTRADOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Programação Orientada a Objetos
   • Classes e métodos estáticos
   • Encapsulamento
   • Padrão Singleton

✅ Banco de Dados NoSQL
   • Operações CRUD completas
   • Queries e filtros
   • Índices únicos

✅ Node.js
   • ES Modules (import/export)
   • Operações assíncronas (async/await)
   • Tratamento de erros (try/catch)
   • Sistema de arquivos (fs)

✅ Arquitetura
   • Separação de responsabilidades
   • Código modular e reutilizável
   • Logging de erros


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 REQUISITOS ATENDIDOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Requisito                                          Status
─────────────────────────────────────────────────────────────────
3 classes com CRUD completo                       ✅ COMPLETO
Arquivo de banco de dados                         ✅ COMPLETO
Classe de log em TXT                              ✅ COMPLETO
Arquivo app.js para teste                         ✅ COMPLETO
Biblioteca de acesso a SGDB                       ✅ COMPLETO
Classes representam entidades                     ✅ COMPLETO
Métodos de inserção/busca/deleção                 ✅ COMPLETO
Temática definida (motor de busca)                ✅ COMPLETO
Uso de Node.js                                    ✅ COMPLETO
Uso de MongoDB                                    ✅ COMPLETO
SEM rotas HTTP                                    ✅ COMPLETO
SEM arquitetura MVC                               ✅ COMPLETO


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 ESTATÍSTICAS DO CÓDIGO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  • Arquivos JavaScript: 6
  • Classes implementadas: 3 (+ 2 auxiliares)
  • Métodos CRUD: 15 (5 por classe)
  • Websites de exemplo (seed): 15
  • Linhas de código: ~400
  • Linhas de documentação: ~800


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ DIFERENCIAL: SEED COM DADOS REAIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

O arquivo seed.js popula o banco com 15 websites reais da temática:

  • MDN Web Docs
  • Node.js
  • MongoDB
  • GitHub
  • Stack Overflow
  • W3Schools
  • freeCodeCamp
  • npm
  • React
  • TypeScript
  • Express.js
  • Docker
  • Postman
  • VS Code
  • Python

Cada website possui keywords relevantes como:
javascript, programação, desenvolvimento, api, database, etc.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 DOCUMENTAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📄 README.md ..................... Visão geral do projeto
  📄 INSTALACAO.md ................. Guia completo de instalação
  📄 API.md ........................ Referência de métodos
  📄 CLASSES.md .................... Documentação das classes
  📄 COMANDOS.md ................... Comandos úteis MongoDB/Node
  📄 MONGODB-INSTALL.md ............ Como instalar MongoDB
  📄 VERIFICACAO-REQUISITOS.md ..... Conformidade com PDFs


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 COMPARAÇÃO: VERSÃO ANTERIOR vs VERSÃO SIMPLIFICADA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Versão Anterior (MVC Completo)          Versão Simplificada
──────────────────────────────────────────────────────────────────
✅ Servidor HTTP (src/server.js)        ❌ Removido
✅ Rotas API REST (src/routes/)         ❌ Removido
✅ Camada Service (src/services/)       ❌ Removido
✅ Frontend HTML/CSS/JS (public/)       ❌ Removido
✅ Models em src/models/                ✅ Movido para raiz
✅ Connection em src/database/          ✅ Simplificado (database.js)
❌ Logger                               ✅ Adicionado (logger.js)
✅ CRUD completo                        ✅ Mantido
✅ Temática (motor de busca)            ✅ Mantida
✅ 15 websites exemplo                  ✅ Mantido (seed.js)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 DICAS DE USO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Sempre inicie o MongoDB antes de executar os scripts
2. Use npm run seed para popular com dados de exemplo
3. Consulte logs/erros.log para debug
4. Adapte app.js para seus próprios testes
5. Veja COMANDOS.md para comandos MongoDB úteis


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

           PROJETO 100% CONFORME REQUISITOS

       Desenvolvido por: Matheus Mondaini (2504219)
            Disciplina: EC48B - Back-End
               Instituição: UTFPR
                Novembro 2025

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
