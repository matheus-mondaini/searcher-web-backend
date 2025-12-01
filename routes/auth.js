import express from 'express';
import User from '../User.js';
import { requireGuest } from '../middleware/auth.js';

const router = express.Router();

router.get('/login', requireGuest, (req, res) => {
  res.render('login', {
    title: 'Login',
    error: null
  });
});

router.post('/login', requireGuest, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render('login', {
        title: 'Login',
        error: 'Usuário e senha são obrigatórios',
        username
      });
    }

    const user = await User.authenticate(username, password);

    if (!user) {
      return res.render('login', {
        title: 'Login',
        error: 'Usuário ou senha inválidos',
        username
      });
    }

    req.session.userId = user._id.toString();
    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      name: user.name,
      email: user.email
    };

    const redirectTo = req.session.redirectTo || '/dashboard';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  } catch (error) {
    console.error('Erro no login:', error);
    res.render('login', {
      title: 'Login',
      error: 'Erro ao realizar login. Tente novamente.',
      username: req.body.username
    });
  }
});

router.get('/register', requireGuest, (req, res) => {
  res.render('register', {
    title: 'Criar Conta',
    error: null
  });
});

router.post('/register', requireGuest, async (req, res) => {
  try {
    const { username, email, password, confirmPassword, name } = req.body;

    if (!username || !email || !password || !name) {
      return res.render('register', {
        title: 'Criar Conta',
        error: 'Todos os campos são obrigatórios',
        formData: { username, email, name }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render('register', {
        title: 'Criar Conta',
        error: 'Email inválido',
        formData: { username, email, name }
      });
    }

    if (password.length < 6) {
      return res.render('register', {
        title: 'Criar Conta',
        error: 'A senha deve ter no mínimo 6 caracteres',
        formData: { username, email, name }
      });
    }

    if (password !== confirmPassword) {
      return res.render('register', {
        title: 'Criar Conta',
        error: 'As senhas não coincidem',
        formData: { username, email, name }
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      name
    });

    req.session.userId = user._id.toString();
    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      name: user.name,
      email: user.email
    };

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Erro no registro:', error);
    
    let errorMessage = 'Erro ao criar conta. Tente novamente.';
    
    if (error.message.includes('já está em uso')) {
      errorMessage = error.message;
    } else if (error.message.includes('já está cadastrado')) {
      errorMessage = error.message;
    }

    res.render('register', {
      title: 'Criar Conta',
      error: errorMessage,
      formData: { 
        username: req.body.username, 
        email: req.body.email, 
        name: req.body.name 
      }
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
    }
    res.redirect('/login');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
    }
    res.redirect('/login');
  });
});

export default router;
