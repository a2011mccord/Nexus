const router = require('express').Router();
const { restoreUser } = require('../../utils/auth');
const sessionRouter = require('./session');
const usersRouter = require('./users');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

module.exports = router;
