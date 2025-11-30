import database from './database.js';
import Website from './Website.js';
import Keyword from './Keyword.js';
import SearchRecord from './SearchRecord.js';

async function runDemo() {
  try {
    await database.connect();
    console.log('✅ Banco conectado com sucesso');

    // Criação de registros
    const novoWebsite = await Website.create({
      url: 'https://exemplo.com',
      title: 'Meu Site Exemplo',
      description: 'Website cadastrado para demonstração',
      keywords: ['exemplo', 'teste']
    });
    console.log('🌐 Website criado:', novoWebsite);

    const novaKeyword = await Keyword.create({
      word: 'programacao',
      relatedWebsites: [novoWebsite._id.toString()]
    });
    console.log('🔑 Keyword criada:', novaKeyword);

    const novaBusca = await SearchRecord.create({
      query: 'programacao',
      resultsCount: 1,
      metadata: { usuario: 'teste@utfpr.br' }
    });
    console.log('🔍 Registro de busca criado:', novaBusca);

    // Atualização
    await Website.update(novoWebsite._id.toString(), { title: 'Site Atualizado' });
    console.log('🛠️  Website atualizado com novo título');

    const websites = await Website.findAll();
    console.log('📚 Websites cadastrados:', websites);

    // Limpeza dos registros criados
    await SearchRecord.delete(novaBusca._id.toString());
    await Keyword.delete(novaKeyword._id.toString());
    await Website.delete(novoWebsite._id.toString());
    console.log('🧹 Registros de demonstração removidos');
  } catch (error) {
    console.error('Erro na execução do demo:', error.message);
  } finally {
    await database.disconnect();
    console.log('🔌 Conexão encerrada');
  }
}

runDemo();
