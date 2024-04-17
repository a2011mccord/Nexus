const router = require('express').Router();
const { restoreUser } = require('../../utils/auth');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const contactsRouter = require('./contacts');
const projectsRouter = require('./projects');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/contacts', contactsRouter);

router.use('/projects', projectsRouter);

module.exports = router;
