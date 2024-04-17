const express = require('express');

const { requireAuth, authorize } = require('../../utils/auth');
const { projectExists } = require('../../utils/checkExists');
const { Contact, User, Project } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const projects = await Project.findAll({
    where: { repId: user.id }
  })

  let projectsList = []
  projects.forEach(project => {
    projectsList.push(project.toJSON());
  });

  res.json({
    'Projects': projectsList
  });
});

router.get('/:projectId', projectExists, async (req, res, next) => {
  const projectId = req.params.projectId;
  let project = await Project.findByPk(projectId, {
    include: [
      {
        model: User,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
          'username'
        ],
        as: "Rep"
      },
      {
        model: Contact,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    ]
  });

  project = project.toJSON();

  res.json(project)
});

module.exports = router;
