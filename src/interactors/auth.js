const { createUser, findUser, updateUser, findById } = require('../services/auth');
const { encryptPassword, verifyPassword } = require('../utils/bcrypt.handle');
const { generateToken, verifyToken } = require('../utils/jwt.handle');
const {
  conflict,
  notFoundError,
  unauthorized,
} = require('../errors/customError');
const { sendMail, generateLinkVerification } = require('../helpers/mail');
const User = require('../models/user');

const createNewUser = async ({ username, email, password, phone }) => {
  try {
    const user = await findUser({ email });
    if (user) {
      throw conflict('User already exists');
    }
    const encryptedPass = await encryptPassword(password);
    // creates user
    const newUser = await createUser(username, email, encryptedPass, phone);
    const token = generateToken(newUser.id);
    // send Mail
    return generateLinkVerification(token);
    // await sendMail(email, {username, linkVerification});
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const userFound = await findUser(email);
    if (!userFound) {
      throw notFoundError('Invalid Credentials');
    }
    const matchPassword = await verifyPassword(password, userFound.password);
    if (!matchPassword) {
      throw unauthorized('Invalid Credentials');
    }
    const token = generateToken(userFound.id);

    return {
      access_token: token,
    };
  } catch (error) {
    throw error;
  }
};

const verifyAccount = async (token) => {
  try {
    const { id } = verifyToken(token);
    const user = await findById(id);
    if (!user) {
      throw notFoundError('Credenciales incorrectas');
    }
    await updateUser({ email: user.email }, { isVerified: true });
    return 'Mail verified!! Please Login';
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser, loginUser, verifyAccount };
