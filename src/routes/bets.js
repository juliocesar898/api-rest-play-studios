const { Router } = require('express');
const { isAuth, isVerified } = require('../middlewares/auth');
const { validate, createBetValidation } = require('../middlewares/inputCheck');
const { saveBet, getBets } = require('../controllers/bet');

const router = Router();

router.post('/', isAuth, isVerified, createBetValidation(), validate, saveBet);
router.get('/', isAuth, isVerified, getBets);

module.exports = router;
