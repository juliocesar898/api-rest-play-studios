const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { unauthorized } = require('../errors/customError');
const { verifyToken } = require('../utils/jwt.handle');

const isAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(unauthorized('Token was not provided'));
  } else {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      req.userId = decoded.id;

      const user = await User.findById(req.userId, { password: 0 });
      if (!user) return;

      req.user = user;
      next();
    } catch (error) {
      res.status(401).send(error.message);
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
