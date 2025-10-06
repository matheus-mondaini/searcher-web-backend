// API Base URL
const API_BASE = '/api';

// Elementos do DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsTitle = document.getElementById('resultsTitle');
const resultsInfo = document.getElementById('resultsInfo');
const resultsList = document.getElementById('resultsList');
const suggestions = document.getElementById('suggestions');

const toggleAddBtn = document.getElementById('toggleAddBtn');
const addWebsiteForm = document.getElementById('addWebsiteForm');
const websiteForm = document.getElementById('websiteForm');
const cancelBtn = document.getElementById('cancelBtn');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadStatistics();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    // Sugestões de busca
    searchInput.addEventListener('input', debounce(getSuggestions, 300));
    
    // Formulário de adicionar website
    toggleAddBtn.addEventListener('click', toggleAddForm);
    cancelBtn.addEventListener('click', toggleAddForm);
    websiteForm.addEventListener('submit', handleAddWebsite);
}

// Realiza busca
async function performSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Por favor, digite um termo de busca');
        return;
    }

    try {
        resultsList.innerHTML = '<div class="loading">Buscando</div>';
        resultsSection.style.display = 'block';

        const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        displayResults(data);
        loadStatistics(); // Atualiza estatísticas após busca
    } catch (error) {
        console.error('Erro ao buscar:', error);
        resultsList.innerHTML = '<p class="error">Erro ao realizar busca. Tente novamente.</p>';
    }
}

// Exibe resultados da busca
function displayResults(data) {
    resultsTitle.textContent = `Resultados para "${data.query}"`;
    resultsInfo.textContent = `${data.totalResults} resultado(s) encontrado(s)`;

    if (data.results.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente usar palavras-chave diferentes ou adicione novos websites ao sistema.</p>
            </div>
        `;
        return;
    }

    resultsList.innerHTML = data.results.map(result => `
        <div class="result-item">
            <a href="${result.url}" class="result-title" target="_blank" onclick="registerClick('${result._id}')">
                ${result.title}
            </a>
            <div class="result-url">${result.url}</div>
            <div class="result-description">${result.description || 'Sem descrição disponível'}</div>
            <div class="result-meta">
                <span>👁️ ${result.clicks} visualizações</span>
                <span class="result-score">Relevância: ${result.relevanceScore.toFixed(1)}</span>
            </div>
            ${result.keywords && result.keywords.length > 0 ? `
                <div class="result-keywords">
                    ${result.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Registra click em um website
async function registerClick(websiteId) {
    try {
        await fetch(`${API_BASE}/websites/${websiteId}/click`, {
            method: 'POST'
        });
    } catch (error) {
        console.error('Erro ao registrar click:', error);
    }
}

// Busca sugestões
async function getSuggestions() {
    const query = searchInput.value.trim();
    
    if (query.length < 2) {
        suggestions.classList.remove('active');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/suggestions?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.suggestions.length > 0) {
            suggestions.innerHTML = data.suggestions
                .map(s => `<div class="suggestion-item" onclick="selectSuggestion('${s}')">${s}</div>`)
                .join('');
            suggestions.classList.add('active');
        } else {
            suggestions.classList.remove('active');
        }
    } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
    }
}

// Seleciona sugestão
function selectSuggestion(suggestion) {
    searchInput.value = suggestion;
    suggestions.classList.remove('active');
    performSearch();
}

// Toggle formulário de adicionar website
function toggleAddForm() {
    const isHidden = addWebsiteForm.style.display === 'none';
    addWebsiteForm.style.display = isHidden ? 'block' : 'none';
    
    if (!isHidden) {
        websiteForm.reset();
    }
}

// Adiciona novo website
async function handleAddWebsite(e) {
    e.preventDefault();

    const data = {
        url: document.getElementById('urlInput').value.trim(),
        title: document.getElementById('titleInput').value.trim(),
        description: document.getElementById('descriptionInput').value.trim(),
        keywords: document.getElementById('keywordsInput').value
            .split(',')
            .map(k => k.trim())
            .filter(k => k),
        content: document.getElementById('contentInput').value.trim()
    };

    try {
        const response = await fetch(`${API_BASE}/websites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('✅ Website indexado com sucesso!');
            websiteForm.reset();
            toggleAddForm();
            loadStatistics();
        } else {
            alert(`❌ Erro: ${result.error}`);
        }
    } catch (error) {
        console.error('Erro ao adicionar website:', error);
        alert('❌ Erro ao adicionar website. Tente novamente.');
    }
}

// Carrega estatísticas
async function loadStatistics() {
    try {
        const response = await fetch(`${API_BASE}/statistics`);
        const data = await response.json();

        // Atualiza cards de estatísticas
        document.getElementById('totalWebsites').textContent = data.totalWebsites || 0;
        document.getElementById('totalSearches').textContent = 
            data.searchStatistics?.totalSearches || 0;
        document.getElementById('avgResults').textContent = 
            (data.searchStatistics?.averageResults || 0).toFixed(1);

        // Keywords populares
        const keywordsList = document.getElementById('popularKeywords');
        if (data.popularKeywords && data.popularKeywords.length > 0) {
            keywordsList.innerHTML = data.popularKeywords
                .slice(0, 5)
                .map(k => `
                    <li>
                        <span>${k.word}</span>
                        <span class="popular-count">${k.searchCount} buscas</span>
                    </li>
                `).join('');
        } else {
            keywordsList.innerHTML = '<li>Nenhuma busca realizada ainda</li>';
        }

        // Websites populares
        const websitesList = document.getElementById('popularWebsites');
        if (data.popularWebsites && data.popularWebsites.length > 0) {
            websitesList.innerHTML = data.popularWebsites
                .slice(0, 5)
                .map(w => `
                    <li>
                        <span>${w.title}</span>
                        <span class="popular-count">${w.clicks} clicks</span>
                    </li>
                `).join('');
        } else {
            websitesList.innerHTML = '<li>Nenhum website indexado ainda</li>';
        }
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fecha sugestões ao clicar fora
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.classList.remove('active');
    }
});
