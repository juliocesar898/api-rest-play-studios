const { sign, verify } = require('jsonwebtoken');
const secret = process.env.API_SECRET || 'secret_api_00123';
const timeExpiration = process.env.TOKEN_EXPIRATION || 3600;
const { unauthorized } = require('../errors/customError');

const generateToken = (id) =>
  sign({ id }, secret, {
    expiresIn: timeExpiration,
  });

const verifyToken = (jwt) => {
  try {
    return verify(jwt, secret);
  } catch (error) {
    throw unauthorized(error.message)
  }
};

module.exports = { generateToken, verifyToken };
