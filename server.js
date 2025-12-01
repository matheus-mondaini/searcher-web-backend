import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import database from './database.js';
import User from './User.js';
import authRoutes from './routes/auth.js';
import mainRoutes from './routes/main.js';
import { loadUser } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

async function initializeDatabase() {
  try {
    await database.connect();
    console.log('✅ Conectado ao MongoDB com sucesso!');

    await User.createIndexes();
    console.log('✅ Índices criados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    process.exit(1);
  }
}

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'motor-busca-utfpr-ec48b-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: database.url,
      dbName: database.dbName,
      collectionName: 'sessions',
      ttl: 24 * 60 * 60
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    }
  })
);

app.use(loadUser);

app.use((req, res, next) => {
  res.locals.success = null;
  res.locals.error = null;
  next();
});

app.use('/', authRoutes);
app.use('/', mainRoutes);

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Página Não Encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).render('error', {
    title: 'Erro no Servidor',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

async function startServer() {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('  🔍 MOTOR DE BUSCA DE WEBSITES - Projeto 2 EC48B');
    console.log('  Matheus Mondaini (2504219) - UTFPR');
    console.log('='.repeat(60));
    console.log(`\n  🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`  📝 Acesse: http://localhost:${PORT}/login`);
    console.log('\n' + '='.repeat(60) + '\n');
  });
}

process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando servidor...');
  await database.disconnect();
  console.log('✅ Conexão com MongoDB encerrada');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Encerrando servidor...');
  await database.disconnect();
  console.log('✅ Conexão com MongoDB encerrada');
  process.exit(0);
});

startServer();
