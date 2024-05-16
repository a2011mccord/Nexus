const express = require('express');
const { requireAuth, authorize } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { checkUserTeamExists } = require('../../utils/checkExists');
const { Team, Manager, Member, User } = require('../../db/models');

const router = express.Router();

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

router.post('/', requireAuth, checkUserTeamExists, async (req, res, next) => {

});

router.put('/', requireAuth, async (req, res, next) => {

});

router.delete('/', requireAuth, async (req, res, next) => {

});

module.exports = router;
