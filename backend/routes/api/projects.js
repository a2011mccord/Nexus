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

router.post('/', requireAuth, async (req, res, next) => {
  const { user } = req;
  const projectInfo = req.body;
  projectInfo.repId = user.id;

  projectInfo.closeDate = new Date(projectInfo.closeDate)

  // Temporary to satisfy db constraint until Teams are implemented
  projectInfo.teamId = 1;

  const newProject = await Project.create(projectInfo);

  res.status(201);
  res.json(newProject);
});

router.put('/:projectId', projectExists, requireAuth, authorize, async (req, res, next) => {
  const project = await Project.findByPk(req.params.projectId);
  const newProjectInfo = req.body;

  await project.update({
    name: newProjectInfo.name,
    stage: newProjectInfo.stage,
    value: newProjectInfo.value,
    closeDate: new Date(newProjectInfo.closeDate)
  });

  await project.save();
  res.json(project);
});

router.delete('/:projectId', projectExists, requireAuth, authorize, async (req, res, next) => {
  const project = await Project.findByPk(req.params.projectId);

  project.destroy();

  res.json({ 'message': 'Project successfully deleted'});
});

module.exports = router;
