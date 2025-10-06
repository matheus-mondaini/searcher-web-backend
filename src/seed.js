import database from './database/connection.js';
import Website from './models/Website.js';

/**
 * Script para popular o banco de dados com websites de exemplo
 * Execute: node src/seed.js
 */

const sampleWebsites = [
  {
    url: 'https://developer.mozilla.org',
    title: 'MDN Web Docs',
    description: 'Recursos para desenvolvedores, por desenvolvedores. Documentação completa sobre HTML, CSS, JavaScript e APIs web.',
    keywords: ['javascript', 'html', 'css', 'web', 'desenvolvimento', 'programação', 'documentação'],
    content: 'MDN Web Docs é o site oficial de documentação web da Mozilla. Contém tutoriais, referências e guias sobre tecnologias web.'
  },
  {
    url: 'https://nodejs.org',
    title: 'Node.js',
    description: 'Node.js® é um runtime JavaScript assíncrono orientado a eventos, projetado para construir aplicações de rede escaláveis.',
    keywords: ['nodejs', 'javascript', 'backend', 'servidor', 'api', 'desenvolvimento'],
    content: 'Node.js permite executar JavaScript no servidor. É usado para criar APIs REST, servidores web e aplicações em tempo real.'
  },
  {
    url: 'https://www.mongodb.com',
    title: 'MongoDB',
    description: 'MongoDB é um banco de dados NoSQL orientado a documentos, que oferece alta performance, alta disponibilidade e escalabilidade.',
    keywords: ['mongodb', 'banco de dados', 'nosql', 'database', 'desenvolvimento'],
    content: 'MongoDB armazena dados em documentos JSON flexíveis. É ideal para aplicações modernas que precisam de escalabilidade.'
  },
  {
    url: 'https://github.com',
    title: 'GitHub',
    description: 'Plataforma de hospedagem de código-fonte e arquivos com controle de versão usando Git.',
    keywords: ['git', 'github', 'versionamento', 'código', 'programação', 'desenvolvimento'],
    content: 'GitHub é a maior plataforma de desenvolvimento colaborativo. Hospeda milhões de repositórios open source.'
  },
  {
    url: 'https://stackoverflow.com',
    title: 'Stack Overflow',
    description: 'O maior site de perguntas e respostas para desenvolvedores de software.',
    keywords: ['programação', 'dúvidas', 'comunidade', 'desenvolvimento', 'código', 'ajuda'],
    content: 'Stack Overflow é uma comunidade de desenvolvedores ajudando desenvolvedores. Milhões de perguntas e respostas sobre programação.'
  },
  {
    url: 'https://www.w3schools.com',
    title: 'W3Schools',
    description: 'Tutoriais e referências de desenvolvimento web, cobrindo HTML, CSS, JavaScript, SQL, Python e muito mais.',
    keywords: ['tutorial', 'html', 'css', 'javascript', 'sql', 'python', 'aprendizado'],
    content: 'W3Schools oferece tutoriais gratuitos de desenvolvimento web com exemplos práticos e exercícios interativos.'
  },
  {
    url: 'https://www.freecodecamp.org',
    title: 'freeCodeCamp',
    description: 'Aprenda a programar gratuitamente. Plataforma open source com milhares de horas de conteúdo sobre desenvolvimento web.',
    keywords: ['programação', 'tutorial', 'grátis', 'aprendizado', 'web', 'javascript'],
    content: 'freeCodeCamp ensina desenvolvimento web através de desafios de código interativos e projetos práticos.'
  },
  {
    url: 'https://www.npmjs.com',
    title: 'npm - Node Package Manager',
    description: 'O maior registro de software do mundo. Encontre, compartilhe e reutilize pacotes de código JavaScript.',
    keywords: ['npm', 'nodejs', 'pacotes', 'biblioteca', 'javascript', 'desenvolvimento'],
    content: 'npm é o gerenciador de pacotes padrão para Node.js. Contém mais de 1 milhão de pacotes reutilizáveis.'
  },
  {
    url: 'https://react.dev',
    title: 'React',
    description: 'Biblioteca JavaScript para construir interfaces de usuário.',
    keywords: ['react', 'javascript', 'frontend', 'ui', 'componentes', 'desenvolvimento'],
    content: 'React é uma biblioteca mantida pelo Facebook para criar interfaces de usuário interativas e reativas.'
  },
  {
    url: 'https://www.typescriptlang.org',
    title: 'TypeScript',
    description: 'TypeScript é JavaScript com sintaxe para tipos.',
    keywords: ['typescript', 'javascript', 'tipos', 'programação', 'desenvolvimento'],
    content: 'TypeScript adiciona tipagem estática ao JavaScript, tornando o código mais robusto e fácil de manter.'
  },
  {
    url: 'https://expressjs.com',
    title: 'Express.js',
    description: 'Framework web rápido, flexível e minimalista para Node.js.',
    keywords: ['express', 'nodejs', 'framework', 'api', 'web', 'backend'],
    content: 'Express é o framework web mais popular para Node.js, usado para criar APIs e aplicações web.'
  },
  {
    url: 'https://www.docker.com',
    title: 'Docker',
    description: 'Plataforma para desenvolvimento, envio e execução de aplicações em containers.',
    keywords: ['docker', 'container', 'devops', 'virtualização', 'desenvolvimento'],
    content: 'Docker permite empacotar aplicações em containers portáteis que podem ser executados em qualquer lugar.'
  },
  {
    url: 'https://www.postman.com',
    title: 'Postman',
    description: 'Plataforma de colaboração para desenvolvimento de APIs.',
    keywords: ['api', 'rest', 'teste', 'desenvolvimento', 'ferramentas'],
    content: 'Postman facilita o desenvolvimento e teste de APIs com uma interface intuitiva e recursos colaborativos.'
  },
  {
    url: 'https://code.visualstudio.com',
    title: 'Visual Studio Code',
    description: 'Editor de código gratuito e open source com suporte para debugging, controle Git integrado e extensões.',
    keywords: ['vscode', 'editor', 'ide', 'desenvolvimento', 'programação', 'código'],
    content: 'VS Code é o editor de código mais popular do mundo, com milhares de extensões e recursos poderosos.'
  },
  {
    url: 'https://www.python.org',
    title: 'Python',
    description: 'Linguagem de programação poderosa e fácil de aprender.',
    keywords: ['python', 'programação', 'linguagem', 'desenvolvimento', 'ciência de dados'],
    content: 'Python é uma linguagem versátil usada em web, ciência de dados, machine learning, automação e muito mais.'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando população do banco de dados...\n');
    
    // Conecta ao banco
    await database.connect();

    let successCount = 0;
    let errorCount = 0;

    // Insere cada website
    for (const data of sampleWebsites) {
      try {
        const website = new Website(data);
        await website.insert();
        console.log(`✅ Indexado: ${data.title}`);
        successCount++;
      } catch (error) {
        if (error.message.includes('já cadastrada')) {
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
    console.log('🚀 Você pode iniciar o servidor agora com: npm start\n');

  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
  } finally {
    await database.close();
    process.exit(0);
  }
}

// Executa o seed
seedDatabase();
