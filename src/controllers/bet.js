const { createNewBet, getBetsByUser } = require('../interactors/bet');

const saveBet = ({ body, user }, res, next) =>
  createNewBet(body, user)
    .then(() => res.status(201).send())
    .catch(next);

const getBets = ({ user }, res, next) =>
  getBetsByUser(user)
    .then((bets) => res.status(200).send(bets))
    .catch(next);

module.exports = { saveBet, getBets };
