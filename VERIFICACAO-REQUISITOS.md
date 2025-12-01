# Verificação de Requisitos - Projeto 1 EC48B

**Data:** 30 de novembro de 2025  
**Aluno:** Matheus Mondaini (2504219)

## 📋 Requisitos da Recuperação

### ✅ Estrutura Solicitada

| Requisito | Status | Implementação |
|-----------|--------|---------------|
| 3 classes com CRUD completo | ✅ Atendido | `Website.js`, `Keyword.js`, `SearchRecord.js` |
| Arquivo de banco de dados | ✅ Atendido | `database.js` |
| Classe de log em TXT | ✅ Atendido | `logger.js` grava em `logs/erros.log` |
| Arquivo app.js para teste | ✅ Atendido | `app.js` demonstra todas as operações |

### ✅ Métodos CRUD (Cada Classe)

Todas as três classes implementam:
- ✅ `create(data)` - Inserção
- ✅ `findAll()` - Listagem completa
- ✅ `findById(id)` - Busca por ID
- ✅ `update(id, updates)` - Atualização
- ✅ `delete(id)` - Deleção

## 📚 Conformidade com os PDFs

### Proposta do Projeto (proposta_projeto1_ec48b_2025_01.pdf)

**Requisito:** Desenvolvimento de biblioteca de acesso a SGDBs usando Node.js

✅ **Atendido:**
- Node.js como runtime
- MongoDB como SGDB
- Classes representam entidades do banco
- Métodos implementam operações de inserção/busca/deleção

**Requisito:** Classes associadas a uma temática

✅ **Atendido:**
- **Temática:** Sistema de busca e armazenamento de websites (similar ao Google)
- **Website:** URLs, títulos, descrições e keywords dos sites indexados
- **Keyword:** Palavras-chave para busca, relacionadas aos websites
- **SearchRecord:** Histórico de buscas realizadas no sistema

### Conteúdos para Projeto 1 (Back-end - Conteudos para Projeto 1.pdf)

✅ **Node.js:** Utilizado com ES Modules (`type: "module"`)  
✅ **MongoDB:** Driver oficial `mongodb@^6.3.0`  
✅ **Orientação a Objetos:** Classes com métodos estáticos  
✅ **Operações Assíncronas:** Async/await em todos os métodos  
✅ **Tratamento de Erros:** Try/catch com logging via `logger.js`

## 🎯 Temática: Motor de Busca de Websites

### Entidades do Domínio

**1. Website (Site Indexado)**
- URL única do site
- Título e descrição
- Palavras-chave associadas
- Timestamps de criação/atualização

**2. Keyword (Palavra-chave)**
- Termo de busca
- Websites relacionados
- Normalização para lowercase

**3. SearchRecord (Histórico de Busca)**
- Query realizada
- Quantidade de resultados
- Data/hora da execução
- Metadados (IP, usuário, etc)

### Funcionalidades Demonstradas

✅ Indexação de websites com keywords  
✅ Gestão de palavras-chave  
✅ Registro de histórico de buscas  
✅ Busca por ID  
✅ Listagem completa  
✅ Atualização de dados  
✅ Remoção de registros  

## 📦 Arquivos do Projeto

```
projeto-1/
├── Website.js          # Classe 1 - CRUD de websites
├── Keyword.js          # Classe 2 - CRUD de palavras-chave
├── SearchRecord.js     # Classe 3 - CRUD de histórico
├── database.js         # Singleton de conexão MongoDB
├── logger.js           # Log de erros em TXT
├── app.js              # Script de demonstração
├── seed.js             # Popular com 15 websites exemplo
├── package.json        # Configuração Node.js
├── README.md           # Documentação principal
├── API.md              # Referência de métodos
├── CLASSES.md          # Detalhamento das classes
└── logs/
    └── erros.log       # Arquivo de log gerado
```

## 🔍 Diferencial: seed.js

O arquivo `seed.js` foi **restaurado** pois:

1. **Demonstra a temática:** Popula o banco com 15 websites reais relacionados a desenvolvimento (MDN, Node.js, MongoDB, GitHub, Stack Overflow, VS Code, React, Docker, etc.)

2. **Facilita testes:** Permite testar buscas por keywords com volume maior de dados

3. **Mostra aplicação prática:** Websites contêm keywords reais como `javascript`, `programação`, `desenvolvimento`, `api`, etc.

## ✨ Execução

```bash
# Instalar dependências
npm install

# Popular banco com dados de exemplo (opcional)
npm run seed

# Executar demonstração CRUD
npm start
```

## 📊 Resumo de Conformidade

| Aspecto | Atendimento |
|---------|-------------|
| **Estrutura Solicitada** | 100% ✅ |
| **CRUD Completo** | 100% ✅ |
| **Requisitos do PDF** | 100% ✅ |
| **Temática Coerente** | 100% ✅ |
| **Documentação** | 100% ✅ |

## 🎓 Conclusão

O projeto atende **integralmente** aos requisitos da recuperação:
- Sem rotas HTTP ou MVC
- Foco em biblioteca de acesso ao MongoDB
- Três classes com CRUD completo
- Arquivo de banco e logger dedicados
- Script de teste funcional
- Temática clara e coerente (motor de busca)
- Seed com dados reais da temática
