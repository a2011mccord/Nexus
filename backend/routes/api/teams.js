const express = require('express');
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { requireAuth, authorize, authTeamOwner } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { checkUserTeamExists } = require('../../utils/checkExists');
const { Team, Manager, Member, User } = require('../../db/models');

const router = express.Router();

const validateNewMember = [
  check('newMember')
    .custom(async value => {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: value }, { email: value }]
        }
      });

      if (!user) {
        throw new Error('No user exists with that username or email');
      }

      const member = await Member.findOne({ where: { userId: user.id } });
      const manager = await Manager.findOne({ where: { userId: user.id } });

      if (member || manager) {
        throw new Error('That user is already part of a team');
      }

      return true;
    }),
  handleValidationErrors
]

router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  let team = await Team.findOne({
    where: { ownerId: user.id },
    include: [
      {
        model: User,
        as: 'Owner'
      },
      {
        model: Manager,
        include: [{ model: User }]
      },
      {
        model: Member,
        include: [{ model: User }]
      }
    ]
  });

  if (team) {
    const teamInfo = {
      id: team.id,
      name: team.name,
      Owner: team.Owner,
      Managers: [],
      Members: []
    };
    team.Managers.forEach(manager => {
      teamInfo.Managers.push(manager.User);
    });
    team.Members.forEach(member => {
      teamInfo.Members.push(member.User);
    });

    return res.json(teamInfo);
  };

  const manager = await Manager.findOne({ where: { userId: user.id }});
  const member = await Member.findOne({ where: { userId: user.id }})
  if (manager) team = await Team.findByPk(manager.teamId, {
    include: [
      {
        model: User,
        as: 'Owner'
      },
      {
        model: Manager,
        include: [{ model: User }]
      },
      {
        model: Member,
        include: [{ model: User }]
      }
    ]
  });
  if (member) team = await Team.findByPk(member.teamId, {
    include: [
      {
        model: User,
        as: 'Owner'
      },
      {
        model: Manager,
        include: [{ model: User }]
      },
      {
        model: Member,
        include: [{ model: User }]
      }
    ]
  });

  if (team) {
    const teamInfo = {
      id: team.id,
      name: team.name,
      Owner: team.Owner,
      Managers: [],
      Members: []
    };
    team.Managers.forEach(manager => {
      teamInfo.Managers.push(manager.User);
    });
    team.Members.forEach(member => {
      teamInfo.Members.push(member.User);
    });

    return res.json(teamInfo);
  };

  res.json({ 'message': 'You are not part of a team'})
});

router.post('/members', requireAuth, authTeamOwner, validateNewMember, async (req, res, next) => {
  const { user } = req;
  const { newMember, role } = req.body;
  const newMemberInfo = await User.findOne({
    where: {
      [Op.or]: [{ username: newMember }, { email: newMember }]
    }
  });
  let team = await Team.findOne({
    where: { ownerId: user.id },
    include: [
      { model: User, as: 'Owner' },
      { model: Manager, include: [{ model: User }] },
      { model: Member, include: [{ model: User }] }
    ]
  });

  if (role === 'Member') {
    const memberInfo = {
      teamId: team.id,
      userId: newMemberInfo.id
    }

    const newMember = await Member.create(memberInfo);

    const teamInfo = {
      id: team.id,
      name: team.name,
      Owner: team.Owner,
      Managers: [],
      Members: []
    };
    team.Managers.forEach(manager => {
      teamInfo.Managers.push(manager.User);
    });
    team.Members.forEach(member => {
      teamInfo.Members.push(member.User);
    });
    const newMemberUser = await User.findByPk(newMember.userId);
    teamInfo.Members.push(newMemberUser);

    res.status(201);
    res.json(teamInfo);
  }

  if (role === 'Manager') {
    const memberInfo = {
      teamId: team.id,
      userId: newMemberInfo.id
    }

    const newManager = await Manager.create(memberInfo);

    const teamInfo = {
      id: team.id,
      name: team.name,
      Owner: team.Owner,
      Managers: [],
      Members: []
    };
    team.Managers.forEach(manager => {
      teamInfo.Managers.push(manager.User);
    });
    team.Members.forEach(member => {
      teamInfo.Members.push(member.User);
    });
    const newManagerUser = await User.findByPk(newManager.userId);
    teamInfo.Managers.push(newManagerUser);

    res.status(201);
    res.json(teamInfo);
  }
});

router.post('/', requireAuth, checkUserTeamExists, async (req, res, next) => {
  const { user } = req;
  const teamInfo = req.body;
  teamInfo.ownerId = user.id;

  const existingTeams = await Team.findAll();
  existingTeams.forEach(team => {
    const err = new Error('Team already exists');
    err.errors = {};

    if (team.name === teamInfo.name) {
      err.errors.name = 'Team with that name already exists';
    };

    if (Object.keys(err.errors).length) {
      next(err);
    };
  });

  const newTeam = await Team.create(teamInfo);
  const newTeamInfo = {
    id: newTeam.id,
    name: newTeam.name,
    Owner: user,
    Managers: [],
    Members: []
  }

  res.status(201);
  res.json(newTeamInfo);
});

router.put('/members/:memberId', requireAuth, authTeamOwner, async (req, res, next) => {
  const { user } = req;
  const { role } = req.body;
  const memberId = req.params.memberId;
  let team = await Team.findOne({
    where: { ownerId: user.id },
    include: [
      { model: User, as: 'Owner' },
      { model: Manager, include: [{ model: User }] },
      { model: Member, include: [{ model: User }] }
    ]
  });
  const member = await Member.findOne({ where: { userId: memberId } });
  const manager = await Manager.findOne({ where: { userId: memberId } });

  if (role === 'Member' && manager) {
    const managerInfo = {
      userId: manager.userId,
      teamId: manager.teamId
    }

    manager.destroy();
    const newMember = await Member.create(managerInfo);

    const teamInfo = {
      id: team.id,
      name: team.name,
      Owner: team.Owner,
      Managers: [],
      Members: []
    };
    team.Managers.forEach(manager => {
      if (manager.userId !== managerInfo.userId) {
        teamInfo.Managers.push(manager.User);
      }
    });
    team.Members.forEach(member => {
      teamInfo.Members.push(member.User);
    });
    const newMemberUser = await User.findByPk(newMember.userId);
    teamInfo.Members.push(newMemberUser);

    res.status(201);
    res.json(teamInfo);
  } else if (role === 'Member' && member) {
    const teamInfo = {
      id: team.id,
      name: team.name,
      Owner: team.Owner,
      Managers: [],
      Members: []
    };
    team.Managers.forEach(manager => {
      teamInfo.Managers.push(manager.User);
    });
    team.Members.forEach(member => {
      teamInfo.Members.push(member.User);
    });

    res.status(201);
    res.json(teamInfo);
  }

  if (role === 'Manager' && member) {
    const memberInfo = {
      userId: member.userId,
      teamId: member.teamId
    };

    member.destroy();
    const newManager = await Manager.create(memberInfo);

    const teamInfo = {
      id: team.id,
      name: team.name,
      Owner: team.Owner,
      Managers: [],
      Members: []
    };
    team.Managers.forEach(manager => {
      teamInfo.Managers.push(manager.User);
    });
    team.Members.forEach(member => {
      if (member.userId !== memberInfo.userId) {
        teamInfo.Members.push(member.User);
      }
    });
    const newManagerUser = await User.findByPk(newManager.userId);
    teamInfo.Managers.push(newManagerUser);

    res.status(201);
    res.json(teamInfo);
  } else if (role === 'Manager' && manager) {
    const teamInfo = {
      id: team.id,
      name: team.name,
      Owner: team.Owner,
      Managers: [],
      Members: []
    };
    team.Managers.forEach(manager => {
      teamInfo.Managers.push(manager.User);
    });
    team.Members.forEach(member => {
      teamInfo.Members.push(member.User);
    });

    res.status(201);
    res.json(teamInfo);
  }
});

router.put('/:teamId', requireAuth, authTeamOwner, async (req, res, next) => {
  const team = await Team.findByPk(req.params.teamId);
  const newTeamInfo = req.body;

  const existingTeams = await Team.findAll();
  existingTeams.forEach(team => {
    const err = new Error('Team already exists');
    err.errors = {};
    if (team.id !== +req.params.teamId && team.name === newTeamInfo.name) {
      err.errors.name = 'Team with that name already exists';
    };

    if (Object.keys(err.errors).length) {
      next(err);
    };
  });

  await team.update(newTeamInfo);

  await team.save();
  res.json(team);
});

router.delete('/members/:memberId', requireAuth, authTeamOwner, async (req, res, next) => {
  const member = await Member.findOne({ where: { userId: req.params.memberId}});

  member.destroy();

  res.json({ 'message': 'Member successfully deleted'});
});

router.delete('/managers/:managerId', requireAuth, authTeamOwner, async (req, res, next) => {
  const manager = await Manager.findOne({ where: { userId: req.params.managerId}});

  manager.destroy();

  res.json({ 'message': 'Manager successfully deleted'});
});

router.delete('/', requireAuth, authTeamOwner, async (req, res, next) => {
  const { user } = req;
  const team = await Team.findOne({ where: { ownerId: user.id } });

  team.destroy();

  res.json({ 'message': 'Team successfully deleted'});
});

module.exports = router;
