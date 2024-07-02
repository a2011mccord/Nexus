'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Member } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Member.bulkCreate([
      {
        userId: 3,
        teamId: 1
      },
      {
        userId: 4,
        teamId: 1
      },
      {
        userId: 7,
        teamId: 2
      },
      {
        userId: 8,
        teamId: 2
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Members';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [3, 4, 7, 8] }
    }, {});
  }
};
