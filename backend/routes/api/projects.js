const express = require('express');
const { check } = require('express-validator');
const { requireAuth, authorize } = require('../../utils/auth');
const { projectExists } = require('../../utils/checkExists');
const { handleValidationErrors } = require('../../utils/validation');
const { Contact, User, Project } = require('../../db/models');

const router = express.Router();

const validateProjectInfo = [
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Name is required'),
  check('name')
    .isLength({ min: 3, max: 30 })
    .withMessage('Name must be between 3 and 30 characters'),
  check('teamId')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('TeamId is required'),
  check('repId')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('RepId is required'),
  check('contactId')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('ContactId is required'),
  check('stage')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Stage is required'),
  handleValidationErrors
]

router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const projects = await Project.findAll({
    where: { repId: user.id },
    include: [
      {
        model: Contact,
        attributes: [
          'firstName',
          'lastName'
        ]
      }
    ]
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

router.post('/', requireAuth, validateProjectInfo, async (req, res, next) => {
  const { user } = req;
  const projectInfo = req.body;
  projectInfo.repId = user.id;

  const existingProjects = await Project.findAll()
  existingProjects.forEach(project => {
    if (project.name === projectInfo.name) {
      const err = new Error('Project with that name already exists');
      next(err);
    };
  });

  projectInfo.closeDate = new Date(projectInfo.closeDate).toISOString().split('T')[0]

  // Temporary to satisfy db constraint until Teams are implemented
  projectInfo.teamId = 1;

  const newProject = await Project.create(projectInfo);

  res.status(201);
  res.json(newProject);
});

router.put('/:projectId', projectExists, requireAuth, authorize, validateProjectInfo, async (req, res, next) => {
  const project = await Project.findByPk(req.params.projectId);
  const newProjectInfo = req.body;

  const existingProjects = await Project.findAll()
  existingProjects.forEach(project => {
    if (project.id !== req.params.projectId && project.name === newProjectInfo.name) {
      const err = new Error('Project with that name already exists');
      next(err);
    };
  });

  await project.update(newProjectInfo);

  await project.save();
  res.json(project);
});

router.delete('/:projectId', projectExists, requireAuth, authorize, async (req, res, next) => {
  const project = await Project.findByPk(req.params.projectId);

  project.destroy();

  res.json({ 'message': 'Project successfully deleted'});
});

module.exports = router;
