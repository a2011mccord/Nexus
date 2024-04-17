const router = require('express').Router();
const { restoreUser } = require('../../utils/auth');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const contactsRouter = require('./contacts');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/contacts', contactsRouter);

module.exports = router;
