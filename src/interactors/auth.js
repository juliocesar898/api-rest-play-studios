const {
  createUser,
  findUser,
  updateUser,
  findById,
} = require('../services/auth');
const { encryptPassword, verifyPassword } = require('../utils/bcrypt.handle');
const { generateToken, verifyToken } = require('../utils/jwt.handle');
const {
  conflict,
  notFoundError,
  unauthorized,
} = require('../errors/customError');
const {
  sendMail,
  generateLinkVerification,
  generateLinkRecoveryPassword,
} = require('../helpers/mail');
const { parseUserProfile } = require('../serializers/users');

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
    const linkVerification = generateLinkVerification(token);
    const templateVerification = process.env.VERIFY_ACCOUNT_TEMPLATE_ID;
    await sendMail(email, templateVerification, { username, linkVerification });
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const userFound = await findUser({ email });
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

const userProfile = async (userId) => {
  try {
    const user = await findById(userId);
    return parseUserProfile(user);
  } catch (error) {
    throw error;
  }
};

const verifyAccount = async (token) => {
  try {
    const { id } = verifyToken(token);
    const user = await findById(id);
    if (!user) {
      throw notFoundError('Invalid Credentials');
    }
    await updateUser({ email: user.email }, { isVerified: true });
    return 'Mail verified!! Please Login';
  } catch (error) {
    throw error;
  }
};

const changePassword = async (userId, newPassword) => {
  try {
    const user = await findById(userId);
    const encryptedPass = await encryptPassword(newPassword);
    // let's change the password as well
    await updateUser({ email: user.email }, { password: encryptedPass });
    return 'password change successful!!';
  } catch (error) {
    throw error;
  }
};

const recoveryPassword = async (email) => {
  try {
    const userFound = await findUser({ email });
    if (userFound) {
      const token = generateToken(userFound.id);
      const liknRecoveryPassword = generateLinkRecoveryPassword(token);
      const templateRecovery = process.env.VERIFY_DEVICE_TEMPLATE_ID;
      await sendMail(email, templateRecovery, {
        username,
        liknRecoveryPassword,
      });
    }
    return 'if the email exists, a recovery link has been sent';
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewUser,
  loginUser,
  userProfile,
  verifyAccount,
  changePassword,
  recoveryPassword,
};
