const { getBets, saveBet } = require('../services/bet');
const { v4 } = require('uuid');

const createNewBet = ({amount, codeBeat, description}, { id }) => {
  try {
    const dataNew = {
      uid: v4(),
      codeBeat,
      description,
      amount,
      user: id
    };
    return saveBet(dataNew);
  } catch (error) {
    throw error;
  }
};

const getBetsByUser = (userId) => {
  try {
    return getBets(userId);
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewBet, getBetsByUser };
