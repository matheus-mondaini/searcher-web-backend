export function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }

  req.session.redirectTo = req.originalUrl;
  res.redirect('/login');
}

export function requireGuest(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/dashboard');
  }
  next();
}

export function loadUser(req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.isAuthenticated = !!req.session.userId;
  next();
}
