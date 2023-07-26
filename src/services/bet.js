const Bet = require('../models/bet');
const { databaseError } = require('../errors/customError');

const saveBet = async (data) => {
  try {
    const newBet = new Bet(data);
    await newBet.save();
    return newBet;
  } catch (error) {
    console.error(error.message);
    throw databaseError('An error has occurred saving a bet');
  }
};

const getBets = async (userId) => {
  try {
    const bets = await Bet.find({});
    return bets;
  } catch (error) {
    console.error(error.message);
    throw databaseError("An error has occurred when the user's bets");
  }
};

module.exports = { saveBet, getBets };
