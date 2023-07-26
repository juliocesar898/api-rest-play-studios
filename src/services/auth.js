const User = require('../models/user');
const { databaseError } = require('../errors/customError');

const findUser = (filter) => {
  try {
    return User.findOne(filter);
  } catch (error) {
    console.error(error.message);
    throw databaseError('An error has occurred when retrieving a user');
  }
};

const findById = (id) => {
  try {
    return User.findById(id);
  } catch (error) {
    console.error(error.message);
    throw databaseError('An error has occurred when retrieving a user');
  }
};

const createUser = (username, email, password, phone) => {
  try {
    const newUser = new User({
      username,
      email,
      password,
      phone,
    });
    return newUser.save();
  } catch (error) {
    console.error(error.message);
    throw databaseError('An error has occurred when creating a user');
  }
};

const updateUser = (where, data) => {
  try {
    return User.findOneAndUpdate(where, data)
  } catch (error) {
    console.error(error.message);
    throw databaseError('An error has occurred when updating a user');
  }
}

module.exports = {
  findUser,
  findById,
  createUser,
  updateUser
};
