const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { unauthorized, forbiddenError } = require('../errors/customError');
const { verifyToken } = require('../utils/jwt.handle');

const isAuth = async (req, _, next) => {
  let response = {};
  let token = null;

  if (!req.headers.authorization) {
    return next(unauthorized('Token was not provided'));
  } else {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      req.userId = decoded.id;

      const user = await User.findById(req.userId, { password: 0 });
      if (!user) return;
      response.message = 'usuario no encontrado';

      req.user = user;

      next();
    } catch (error) {
      throw error;
    }
  }
};

const isVerified = (req, _, next) => {
  try {
    if (!req.user.isVerified) {
      return next(unauthorized('User not verified'));
    }
    next();
  } catch (error) {
    throw error;
  }
};

module.exports = { isAuth, isVerified };
