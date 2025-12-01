import express from 'express';
import Website from '../Website.js';
import Keyword from '../Keyword.js';
import SearchRecord from '../SearchRecord.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const websites = await Website.findAll();
    const searches = await SearchRecord.findAll();
    const keywords = await Keyword.findAll();

    res.render('dashboard', {
      title: 'Dashboard',
      websites: websites.slice(0, 10),
      totalWebsites: websites.length,
      totalSearches: searches.length,
      totalKeywords: keywords.length,
      recentSearches: searches.slice(-5).reverse()
    });
  } catch (error) {
    console.error('Erro no dashboard:', error);
    res.render('dashboard', {
      title: 'Dashboard',
      websites: [],
      totalWebsites: 0,
      totalSearches: 0,
      totalKeywords: 0,
      recentSearches: [],
      error: 'Erro ao carregar dados do dashboard'
    });
  }
});

router.get('/search', requireAuth, async (req, res) => {
  const query = req.query.q || '';

  if (!query) {
    return res.render('search', {
      title: 'Buscar Websites',
      query: '',
      results: [],
      searched: false
    });
  }

  try {
    const websites = await Website.findAll();
    const queryLower = query.toLowerCase();
    
    const results = websites.filter(website => {
      return website.keywords.some(keyword => 
        keyword.includes(queryLower)
      ) || 
      website.title.toLowerCase().includes(queryLower) ||
      website.description.toLowerCase().includes(queryLower);
    });

    await SearchRecord.create({
      query: queryLower,
      resultsCount: results.length,
      metadata: {
        userId: req.session.userId,
        username: req.session.user.username
      }
    });

    res.render('search', {
      title: 'Resultados da Busca',
      query,
      results,
      searched: true
    });
  } catch (error) {
    console.error('Erro na busca:', error);
    res.render('search', {
      title: 'Buscar Websites',
      query,
      results: [],
      searched: true,
      error: 'Erro ao realizar busca. Tente novamente.'
    });
  }
});

router.get('/websites', requireAuth, async (req, res) => {
  try {
    const websites = await Website.findAll();
    
    res.render('websites', {
      title: 'Websites Indexados',
      websites
    });
  } catch (error) {
    console.error('Erro ao listar websites:', error);
    res.render('websites', {
      title: 'Websites Indexados',
      websites: [],
      error: 'Erro ao carregar websites'
    });
  }
});

router.get('/websites/add', requireAuth, (req, res) => {
  res.render('add-website', {
    title: 'Adicionar Website',
    error: null,
    success: null
  });
});

router.post('/websites/add', requireAuth, async (req, res) => {
  try {
    const { url, title, description, keywords } = req.body;

    if (!url || !title) {
      return res.render('add-website', {
        title: 'Adicionar Website',
        error: 'URL e título são obrigatórios',
        success: null,
        formData: { url, title, description, keywords }
      });
    }

    try {
      new URL(url);
    } catch (e) {
      return res.render('add-website', {
        title: 'Adicionar Website',
        error: 'URL inválida. Use o formato completo (https://exemplo.com)',
        success: null,
        formData: { url, title, description, keywords }
      });
    }

    const keywordArray = keywords 
      ? keywords.split(',').map(k => k.trim()).filter(k => k)
      : [];

    const website = await Website.create({
      url,
      title,
      description: description || '',
      keywords: keywordArray
    });

    for (const keyword of keywordArray) {
      try {
        const existingKeyword = await Keyword.findAll();
        const found = existingKeyword.find(k => k.word === keyword.toLowerCase());

        if (found) {
          const relatedWebsites = found.relatedWebsites || [];
          if (!relatedWebsites.includes(website._id.toString())) {
            relatedWebsites.push(website._id.toString());
            await Keyword.update(found._id.toString(), {
              relatedWebsites
            });
          }
        } else {
          await Keyword.create({
            word: keyword,
            relatedWebsites: [website._id.toString()]
          });
        }
      } catch (error) {
        console.error('Erro ao processar keyword:', keyword, error);
      }
    }

    res.render('add-website', {
      title: 'Adicionar Website',
      error: null,
      success: 'Website adicionado com sucesso!',
      formData: null
    });
  } catch (error) {
    console.error('Erro ao adicionar website:', error);
    
    let errorMessage = 'Erro ao adicionar website. Tente novamente.';
    
    if (error.message.includes('duplicate key')) {
      errorMessage = 'Já existe um website com esta URL';
    }

    res.render('add-website', {
      title: 'Adicionar Website',
      error: errorMessage,
      success: null,
      formData: req.body
    });
  }
});

router.get('/statistics', requireAuth, async (req, res) => {
  try {
    const websites = await Website.findAll();
    const searches = await SearchRecord.findAll();
    const keywords = await Keyword.findAll();

    const keywordCount = {};
    websites.forEach(website => {
      website.keywords.forEach(keyword => {
        keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
      });
    });

    const topKeywords = Object.entries(keywordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    const recentSearches = searches.slice(-10).reverse();

    res.render('statistics', {
      title: 'Estatísticas',
      totalWebsites: websites.length,
      totalSearches: searches.length,
      totalKeywords: keywords.length,
      topKeywords,
      recentSearches
    });
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
    res.render('statistics', {
      title: 'Estatísticas',
      totalWebsites: 0,
      totalSearches: 0,
      totalKeywords: 0,
      topKeywords: [],
      recentSearches: [],
      error: 'Erro ao carregar estatísticas'
    });
  }
});

export default router;
