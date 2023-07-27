const {
  createNewUser,
  loginUser,
  changePassword,
  recoveryPassword,
  verifyAccount,
  userProfile,
} = require('../interactors/auth');

const signUp = ({ body }, res, next) =>
  createNewUser(body)
    .then((newUser) => res.status(201).send(newUser))
    .catch(next);

const signIn = ({ body }, res, next) =>
  loginUser(body)
    .then(({ access_token }) => res.status(200).send({ token: access_token }))
    .catch(next);

const profile = ({user: {id}}, res, next) =>
  userProfile(id)
  .then((data) => res.status(200).send(data))
    .catch(next);

const verifyAccountProfile = ({ query: { token } }, res, next) =>
  verifyAccount(token)
    .then((response) => res.status(200).send(response))
    .catch(next);

const changeUserPassword = (
  { user: { id }, body: { newPassword } },
  res,
  next
) =>
  changePassword(id, newPassword)
    .then((response) => res.status(204).send(response))
    .catch(next);

const recoveryUserPassword = ({ body: { email } }, res, next) =>
  recoveryPassword(email)
    .then((response) => res.status(200).send(response))
    .catch(next);

module.exports = {
  signUp,
  signIn,
  profile,
  verifyAccountProfile,
  changeUserPassword,
  recoveryUserPassword,
};
