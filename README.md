# Biblioteca de Acesso ao MongoDB

**Disciplina:** Programação Web Back-End (EC48B)  
**Projeto:** Recuperação do Projeto 1  
**Aluno:** Matheus Mondaini (2504219)

## Objetivo

Implementar **três classes com operações CRUD completas** utilizando apenas Node.js e MongoDB, sem rotas HTTP ou divisão em camadas MVC. O foco é demonstrar o acesso ao banco de dados através de uma biblioteca simples executada diretamente pelo arquivo `app.js`.

## Arquivos Principais

| Arquivo            | Descrição |
|--------------------|-----------|
| `database.js`      | Abre e fecha a conexão com o MongoDB |
| `logger.js`        | Classe de log que grava erros em `logs/erros.log` |
| `Website.js`       | Classe 1 – CRUD de websites |
| `Keyword.js`       | Classe 2 – CRUD de palavras-chave |
| `SearchRecord.js`  | Classe 3 – CRUD do histórico de buscas |
| `app.js`           | Script de teste que executa operações básicas |

## Requisitos Atendidos

- ✅ Somente Node.js e MongoDB
- ✅ Três classes com CRUD completo
- ✅ Arquivo dedicado para o banco (`database.js`)
- ✅ Classe exclusiva para registro de erros (`logger.js`)
- ✅ Arquivo principal `app.js` para testar as classes

## Como Executar

1. Instale as dependências:
  ```bash
  npm install
  ```
2. Certifique-se de que o MongoDB está em execução em `mongodb://127.0.0.1:27017`.
3. Execute o script de demonstração:
  ```bash
  npm start
  ```

O script cria registros de exemplo nas três coleções, mostra o retorno dos métodos e limpa os dados ao final.

## Estrutura Simplificada

```
projeto-1/
├── Website.js
├── Keyword.js
├── SearchRecord.js
├── database.js
├── logger.js
├── app.js
└── package.json
```

## Como Adaptar para Novos Testes

- Altere os dados utilizados dentro de `app.js` para validar outros cenários (ex.: novas keywords ou buscas).
- Reaproveite os métodos das classes em outros scripts conforme necessidade.
- Consulte `logs/erros.log` sempre que ocorrer uma exceção.

Esta versão cumpre o escopo reduzido solicitado para a recuperação, mantendo o código organizado, porém sem rotas ou camadas adicionais.
