const express = require('express');

const { requireAuth, authorize } = require('../../utils/auth');
const { Contact, User, Project } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const contacts = await Contact.findAll({
    where: { user_id: user.id }
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
        model: Project
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

module.exports = router;
