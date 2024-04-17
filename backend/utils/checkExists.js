const { Contact } = require('../db/models');

const contactExists = async (req, res, next) => {
  const contact = await Contact.findByPk(req.params.contactId);

  if (!contact) {
    const err = new Error("Contact doesn't exist");
    err.title = "Database Error"
    err.status = 404;
    return next(err);
  } else {
    return next();
  };
};

module.exports = {
  contactExists
};
