const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('username')
    .custom(value => !(/\s/g.test(value)))
    .withMessage('Username cannot contain spaces'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('password')
    .custom(value => !(/\s/g.test(value)))
    .withMessage('Password cannot contain spaces'),
  check('firstName')
    .custom(value => !(/\s/g.test(value)))
    .withMessage('First Name cannot contain spaces'),
  check('lastName')
    .custom(value => !(/\s/g.test(value)))
    .withMessage('Last Name cannot contain spaces'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const existingUsers = await User.findAll({
      attributes: [ 'username', 'email' ]
    });
    existingUsers.forEach(user => {
      const err = new Error('User already exists');
      err.errors = {};

      if (user.email === email) {
        err.errors.email = "User with that email already exists";
      };
      if (user.username === username) {
        err.errors.username = "User with that username already exists";
      };

      if (Object.keys(err.errors).length) {
        next(err);
      };
    });

    const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;
