const router = require('express').Router();
const { restoreUser } = require('../../utils/auth');
const sessionRouter = require('./session');
const usersRouter = require('./users');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
