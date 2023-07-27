const { Router } = require('express');
const { signUp, signIn, verifyAccountProfile, changeUserPassword, recoveryUserPassword, profile } = require('../controllers/auth');
const { validate, createUserValidation, changePasswordValidation } = require('../middlewares/inputCheck');
const { isAuth } = require('../middlewares/auth');

const router = Router();
/* Login */

/**
 * @openapi
 * /api/auth/signup:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Auth
 *    description: User Registry
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: username (username)
 *              email:
 *                type: string
 *                description: user email (email)
 *              password:
 *                type: string
 *                description: user password
 *              phone:
 *                type: string
 *                description: user phone Number
 *    responses:
 *       201:
 *         description: CREATED
 */
router.post('/signup', createUserValidation(), validate, signUp);

/**
 * @openapi
 * /api/auth/signin:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Auth
 *    description: User login
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: user email (username)
 *              password:
 *                type: string
 *                description: user password
 *    responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: newToken
 */
router.post('/signin', signIn);

/**
 * @openapi
 * /api/auth/profile:
 *   get:
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: johnDoe
 *                 email:
 *                   type: string 
 *                   example: john@test.com
 *                 phone:
 *                   type: string
 *                   example: 123456
 */
router.get('/profile', isAuth, profile);
router.get('/verify-account', verifyAccountProfile);

/**
 * @openapi
 * /api/auth/change-password:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Profile
 *    description: Change Password
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              newPassword:
 *                type: string
 *                description: new user password
 *    responses:
 *       204:
 *         description: Password updated
 */
router.post('/change-password', isAuth, changePasswordValidation(), validate, changeUserPassword);
router.post('/forgot-password', recoveryUserPassword);

/* Password */

/* Verification */

module.exports = router;
