const { Router } = require('express');
const { signUp, signIn, verifyAccountProfile } = require('../controllers/auth');
const { validate, createUserValidation } = require('../middlewares/inputCheck');

const router = Router();
/* Login */
router.post('/signup', createUserValidation(), validate, signUp);
router.post('/signin', signIn);
router.get('/verify-account', verifyAccountProfile);

/* Password */

/* Verification */

module.exports = router;
