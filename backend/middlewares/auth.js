<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError('Неавторизованный пользователь.');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Неавторизованный пользователь.'));
    return;
  }

  req.user = payload;

  next();
};
=======
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError('Неавторизованный пользователь.');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Неавторизованный пользователь.'));
    return;
  }

  req.user = payload;

  next();
};
>>>>>>> 97da421253f9a79b35334e14902ab34ec9ffb303
