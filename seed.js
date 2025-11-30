import database from './database.js';
import Website from './Website.js';

/**
 * Script para popular o banco de dados com websites de exemplo
 * Execute: npm run seed
 */

const sampleWebsites = [
  {
    url: 'https://developer.mozilla.org',
    title: 'MDN Web Docs',
    description: 'Recursos para desenvolvedores, por desenvolvedores. Documentação completa sobre HTML, CSS, JavaScript e APIs web.',
    keywords: ['javascript', 'html', 'css', 'web', 'desenvolvimento', 'programação', 'documentação']
  },
  {
    url: 'https://nodejs.org',
    title: 'Node.js',
    description: 'Node.js® é um runtime JavaScript assíncrono orientado a eventos, projetado para construir aplicações de rede escaláveis.',
    keywords: ['nodejs', 'javascript', 'backend', 'servidor', 'api', 'desenvolvimento']
  },
  {
    url: 'https://www.mongodb.com',
    title: 'MongoDB',
    description: 'MongoDB é um banco de dados NoSQL orientado a documentos, que oferece alta performance, alta disponibilidade e escalabilidade.',
    keywords: ['mongodb', 'banco de dados', 'nosql', 'database', 'desenvolvimento']
  },
  {
    url: 'https://github.com',
    title: 'GitHub',
    description: 'Plataforma de hospedagem de código-fonte e arquivos com controle de versão usando Git.',
    keywords: ['git', 'github', 'versionamento', 'código', 'programação', 'desenvolvimento']
  },
  {
    url: 'https://stackoverflow.com',
    title: 'Stack Overflow',
    description: 'O maior site de perguntas e respostas para desenvolvedores de software.',
    keywords: ['programação', 'dúvidas', 'comunidade', 'desenvolvimento', 'código', 'ajuda']
  },
  {
    url: 'https://www.w3schools.com',
    title: 'W3Schools',
    description: 'Tutoriais e referências de desenvolvimento web, cobrindo HTML, CSS, JavaScript, SQL, Python e muito mais.',
    keywords: ['tutorial', 'html', 'css', 'javascript', 'sql', 'python', 'aprendizado']
  },
  {
    url: 'https://www.freecodecamp.org',
    title: 'freeCodeCamp',
    description: 'Aprenda a programar gratuitamente. Plataforma open source com milhares de horas de conteúdo sobre desenvolvimento web.',
    keywords: ['programação', 'tutorial', 'grátis', 'aprendizado', 'web', 'javascript']
  },
  {
    url: 'https://www.npmjs.com',
    title: 'npm - Node Package Manager',
    description: 'O maior registro de software do mundo. Encontre, compartilhe e reutilize pacotes de código JavaScript.',
    keywords: ['npm', 'nodejs', 'pacotes', 'biblioteca', 'javascript', 'desenvolvimento']
  },
  {
    url: 'https://react.dev',
    title: 'React',
    description: 'Biblioteca JavaScript para construir interfaces de usuário.',
    keywords: ['react', 'javascript', 'frontend', 'ui', 'componentes', 'desenvolvimento']
  },
  {
    url: 'https://www.typescriptlang.org',
    title: 'TypeScript',
    description: 'TypeScript é JavaScript com sintaxe para tipos.',
    keywords: ['typescript', 'javascript', 'tipos', 'programação', 'desenvolvimento']
  },
  {
    url: 'https://expressjs.com',
    title: 'Express.js',
    description: 'Framework web rápido, flexível e minimalista para Node.js.',
    keywords: ['express', 'nodejs', 'framework', 'api', 'web', 'backend']
  },
  {
    url: 'https://www.docker.com',
    title: 'Docker',
    description: 'Plataforma para desenvolvimento, envio e execução de aplicações em containers.',
    keywords: ['docker', 'container', 'devops', 'virtualização', 'desenvolvimento']
  },
  {
    url: 'https://www.postman.com',
    title: 'Postman',
    description: 'Plataforma de colaboração para desenvolvimento de APIs.',
    keywords: ['api', 'rest', 'teste', 'desenvolvimento', 'ferramentas']
  },
  {
    url: 'https://code.visualstudio.com',
    title: 'Visual Studio Code',
    description: 'Editor de código gratuito e open source com suporte para debugging, controle Git integrado e extensões.',
    keywords: ['vscode', 'editor', 'ide', 'desenvolvimento', 'programação', 'código']
  },
  {
    url: 'https://www.python.org',
    title: 'Python',
    description: 'Linguagem de programação poderosa e fácil de aprender.',
    keywords: ['python', 'programação', 'linguagem', 'desenvolvimento', 'ciência de dados']
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando população do banco de dados...\n');
    
    await database.connect();

    let successCount = 0;
    let errorCount = 0;

    for (const data of sampleWebsites) {
      try {
        await Website.create(data);
        console.log(`✅ Indexado: ${data.title}`);
        successCount++;
      } catch (error) {
        if (error.message.includes('duplicate key')) {
          console.log(`⚠️  Já existe: ${data.title}`);
        } else {
          console.error(`❌ Erro ao indexar ${data.title}:`, error.message);
          errorCount++;
        }
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Resumo da Indexação:`);
    console.log(`   ✅ Sucesso: ${successCount} websites`);
    console.log(`   ❌ Erros: ${errorCount} websites`);
    console.log('='.repeat(50) + '\n');

    console.log('✨ Banco de dados populado com sucesso!');
    console.log('🚀 Você pode testar agora com: npm start\n');

  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
  } finally {
    await database.disconnect();
    process.exit(0);
  }
}

seedDatabase();
