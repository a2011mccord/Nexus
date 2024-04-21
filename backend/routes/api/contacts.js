const express = require('express');
const { check } = require('express-validator');
const { requireAuth, authorize } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { contactExists } = require('../../utils/checkExists');
const { Contact, User, Project } = require('../../db/models');

const router = express.Router();

const validateContactInfo = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 30 })
    .withMessage('First Name must be between 3 and 30 characters'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 30 })
    .withMessage('Last Name must be between 3 and 30 characters'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('phoneNumber')
    .exists({ checkFalsy: true })
    .isLength({ min: 12, max: 12 })
    .custom(value => /\d{3}-\d{3}-\d{4}/g.test(value))
    .withMessage('Please provide a valid phone number'),
  check('type')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Type field is required'),
  handleValidationErrors
]

router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const contacts = await Contact.findAll({
    where: { userId: user.id }
  })

  let contactsList = []
  contacts.forEach(contact => {
    contactsList.push(contact.toJSON());
  });

  res.json({
    'Contacts': contactsList
  });
});

router.get('/:contactId', contactExists, async (req, res, next) => {
  const contactId = req.params.contactId;
  let contact = await Contact.findByPk(contactId, {
    include: [
      {
        model: User,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
          'username'
        ]
      },
      {
        model: Project,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    ]
  });

  contact = contact.toJSON();

  res.json(contact)
});

router.get('/', async (req, res, next) => {
  const contacts = await Contact.findAll();

  let contactsList = []
  contacts.forEach(contact => {
    contactsList.push(contact.toJSON());
  });

  res.json({
    'Contacts': contactsList
  });
});

router.post('/', requireAuth, validateContactInfo, async (req, res, next) => {
  const { user } = req;
  const contactInfo = req.body;
  contactInfo.userId = user.id;

  const existingContacts = await Contact.findAll()
  existingContacts.forEach(contact => {
    const err = new Error('Contact already exists')
    err.errors = {};

    if (contact.email === contactInfo.email) {
      err.errors.email = "Contact with that email already exists";
    };
    if (contact.phoneNumber === contactInfo.phoneNumber) {
      err.errors.phoneNumber = "Contact with that phone number already exists";
    };

    if (Object.keys(err.errors).length) {
      next(err);
    };
  });

  // Temporary to satisfy db constraint until Teams are implemented
  contactInfo.teamId = 1;

  const newContact = await Contact.create(contactInfo);

  res.status(201);
  res.json(newContact);
});

router.put('/:contactId', contactExists, requireAuth, authorize, validateContactInfo, async (req, res, next) => {
  const contact = await Contact.findByPk(req.params.contactId);
  const newContactInfo = req.body;

  const existingContacts = await Contact.findAll()
  existingContacts.forEach(contact => {
    const err = new Error('Contact already exists')
    err.errors = {};

    if (contact.id !== req.params.contactId && contact.email === contactInfo.email) {
      err.errors.email = "Contact with that email already exists";
    };
    if (contact.id !== req.params.contactId && contact.phoneNumber === contactInfo.phoneNumber) {
      err.errors.phoneNumber = "Contact with that phone number already exists";
    };

    if (Object.keys(err.errors).length) {
      next(err);
    };
  });

  await contact.update(newContactInfo);

  await contact.save();
  res.json(contact);
});

router.delete('/:contactId', contactExists, requireAuth, authorize, async (req, res, next) => {
  const contact = await Contact.findByPk(req.params.contactId);

  contact.destroy();

  res.json({ 'message': 'Contact successfully deleted'});
});

module.exports = router;
