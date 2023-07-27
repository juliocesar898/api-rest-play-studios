const { Router } = require('express');
const { isAuth, isVerified } = require('../middlewares/auth');
const { validate, createBetValidation } = require('../middlewares/inputCheck');
const { saveBet, getBets } = require('../controllers/bet');

const router = Router();

/**
 * @openapi
 * /api/bets:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Bets
 *    description: Creates a Bet
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              codeBeat:
 *                type: string
 *                description: code Beat
 *              description:
 *                type: string
 *                description: beat description
 *              amount:
 *                type: number
 *                description: bet's amount
 *    responses:
 *       201:
 *         description: CREATED
 */
router.post('/', isAuth, createBetValidation(), validate, saveBet);

/**
 * @openapi
 * /api/bets:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Bets
 *    description: Get user's bets
 *    responses:
 *       200:
 *         description: My bets
 */
router.get('/', isAuth, getBets);

module.exports = router;
