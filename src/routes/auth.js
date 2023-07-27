const { Router } = require('express');
const { signUp, signIn, verifyAccountProfile, changeUserPassword, recoveryUserPassword, profile } = require('../controllers/auth');
const { validate, createUserValidation, changePasswordValidation } = require('../middlewares/inputCheck');
const { isAuth } = require('../middlewares/auth');

const router = Router();
/* Login */
router.post('/signup', createUserValidation(), validate, signUp);
router.post('/signin', signIn);
router.get('/profile', isAuth, profile);
router.get('/verify-account', verifyAccountProfile);
router.post('/change-password', isAuth, changePasswordValidation(), validate, changeUserPassword);
router.post('/forgot-password', recoveryUserPassword);

/* Password */

/* Verification */

module.exports = router;
