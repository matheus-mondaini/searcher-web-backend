#!/bin/bash

# Script de teste da API do Motor de Busca
# Execute com: chmod +x test-api.sh && ./test-api.sh

echo "=================================="
echo "  TESTES DA API - MOTOR DE BUSCA"
echo "=================================="
echo ""

BASE_URL="http://localhost:3000/api"

echo "1️⃣  Testando criação de website..."
echo "POST /api/websites"
curl -X POST $BASE_URL/websites \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.utfpr.edu.br",
    "title": "UTFPR - Universidade Tecnológica Federal do Paraná",
    "description": "Site oficial da UTFPR",
    "keywords": ["universidade", "educação", "tecnologia", "utfpr"],
    "content": "A Universidade Tecnológica Federal do Paraná é uma instituição pública de ensino superior."
  }' | json_pp
echo -e "\n"

echo "2️⃣  Testando listagem de websites..."
echo "GET /api/websites"
curl -s $BASE_URL/websites | json_pp | head -n 30
echo -e "\n"

echo "3️⃣  Testando busca por palavra-chave..."
echo "GET /api/search?q=javascript"
curl -s "$BASE_URL/search?q=javascript" | json_pp | head -n 50
echo -e "\n"

echo "4️⃣  Testando keywords populares..."
echo "GET /api/keywords"
curl -s $BASE_URL/keywords | json_pp
echo -e "\n"

echo "5️⃣  Testando sugestões..."
echo "GET /api/suggestions?q=java"
curl -s "$BASE_URL/suggestions?q=java" | json_pp
echo -e "\n"

echo "6️⃣  Testando estatísticas..."
echo "GET /api/statistics"
curl -s $BASE_URL/statistics | json_pp
echo -e "\n"

echo "7️⃣  Testando histórico de buscas..."
echo "GET /api/search/history"
curl -s "$BASE_URL/search/history" | json_pp | head -n 40
echo -e "\n"

echo "=================================="
echo "  ✅ TESTES CONCLUÍDOS!"
echo "=================================="
