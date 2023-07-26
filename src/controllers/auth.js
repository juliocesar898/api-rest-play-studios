const {
  createNewUser,
  loginUser,
  ve,
  verifyAccount,
} = require('../interactors/auth');

const signUp = ({ body }, res, next) =>
  createNewUser(body)
    .then((newUser) => res.status(201).send(newUser))
    .catch(next);

const signIn = ({ body }, res, next) =>
  loginUser(body)
    .then(({ access_token }) => res.status(200).send({ token: access_token }))
    .catch(next);

const verifyAccountProfile = ({ query: { token } }, res, next) =>
  verifyAccount(token)
    .then((response) => res.status(200).send(response))
    .catch(next);

module.exports = { signUp, signIn, verifyAccountProfile };
