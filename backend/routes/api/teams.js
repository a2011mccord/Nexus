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
    teamInfo.Members.push(newMember);

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
    teamInfo.Managers.push(newManager);

    res.status(201);
    res.json(teamInfo);
  }
});

router.post('/', requireAuth, checkUserTeamExists, async (req, res, next) => {

});

router.put('/', requireAuth, async (req, res, next) => {

});

router.delete('/members/:memberId', requireAuth, authTeamOwner, async (req, res, next) => {
  const member = await Member.findByPk(req.params.memberId);

  member.destroy();

  res.json({ 'message': 'Member successfully deleted'})
});

router.delete('/managers/:managerId', requireAuth, authTeamOwner, async (req, res, next) => {
  const manager = await Manager.findByPk(req.params.managerId);

  manager.destroy();

  res.json({ 'message': 'Manager successfully deleted'})
});

router.delete('/', requireAuth, async (req, res, next) => {

});

module.exports = router;
