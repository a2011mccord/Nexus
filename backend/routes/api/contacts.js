const express = require('express');

const { requireAuth, authorize } = require('../../utils/auth');
const { Contact, User, Project } = require('../../db/models');

const router = express.Router();

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

router.get('/:contactId', async (req, res, next) => {
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

  if (contact) {
    contact = contact.toJSON();
  } else {
    res.status(404);
    return res.json({ 'message': "Contact couldn't be found"})
  };

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

router.post('/', requireAuth, async (req, res, next) => {
  const { user } = req;
  const contactInfo = req.body;
  contactInfo.userId = user.id;

  // Temporary to satisfy db constraint until Teams are implemented
  contactInfo.teamId = 1;

  const newContact = await Contact.create(contactInfo);

  res.status(201);
  res.json(newContact);
})

module.exports = router;
