const { Contact, Project, Team, Manager, Member } = require('../db/models');

const contactExists = async (req, _res, next) => {
  const contact = await Contact.findByPk(req.params.contactId);

  if (!contact) {
    const err = new Error("Contact doesn't exist");
    err.title = "Database Error";
    err.status = 404;
    return next(err);
  } else {
    return next();
  };
};

const projectExists = async (req, _res, next) => {
  const project = await Project.findByPk(req.params.projectId);

  if (!project) {
    const err = new Error("Project doesn't exist");
    err.title = "Database Error";
    err.status = 404;
    return next(err);
  } else {
    return next();
  };
};

const checkUserTeamExists = async (req, _res, next) => {
  const { user } = req;
  const team = await Team.findOne({ where: { ownerId: user.id }});
  const manager = await Manager.findOne({ where: { userId: user.id }});
  const member = await Member.findOne({ where: { userId: user.id }});

  if (!team && !manager && !member) {
    return next();
  } else {
    const err = new Error('User already belongs to a team');
    err.title = 'Database Error';
    err.status = 401;
    return next(err);
  }
}

module.exports = {
  contactExists,
  projectExists,
  checkUserTeamExists
};
