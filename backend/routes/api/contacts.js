const express = require('express');

const { requireAuth, authorize } = require('../../utils/auth');
const { Contact } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await Contact.findAll();

  let contactsList = []
  contacts.forEach(contact => {
    contactsList.push(contact.toJSON());
  });

  res.json({
    'Contacts': contactsList
  })
})

module.exports = router;
