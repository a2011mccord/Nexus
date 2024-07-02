'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Manager } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Manager.bulkCreate([
      {
        userId: 2,
        teamId: 1
      },
      {
        userId: 6,
        teamId: 2
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Managers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [2, 6] }
    }, {});
  }
};
