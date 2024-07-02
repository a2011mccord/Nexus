'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Team } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Team.bulkCreate([
      {
        ownerId: 1,
        name: 'Demo Team'
      },
      {
        ownerId: 5,
        name: 'Fake Team'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Teams';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
        'Demo Team',
        'Fake Team'
      ] }
    }, {});
  }
};
