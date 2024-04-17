'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Project } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Project.bulkCreate([
      {
        name: 'Project 1',
        team_id: 1,
        rep_id: 1,
        contact_id: 1,
        stage: 'Lead',
        value: 10000,
        close_date: Date.UTC(2024, 6, 1)
      },
      {
        name: 'Project 2',
        team_id: 1,
        rep_id: 1,
        contact_id: 2,
        stage: 'Prospect',
        value: 3000,
        close_date: Date.UTC(2024, 5, 20)
      },
      {
        name: 'Project 3',
        team_id: 1,
        rep_id: 1,
        contact_id: 3,
        stage: 'Approved',
        value: 5000,
        close_date: Date.UTC(2024, 6, 15)
      },
      {
        name: 'Project 4',
        team_id: 1,
        rep_id: 1,
        contact_id: 1,
        stage: 'Completed',
        value: 8000,
        close_date: Date.UTC(2024, 4, 16)
      },
      {
        name: 'Project 5',
        team_id: 1,
        rep_id: 1,
        contact_id: 2,
        stage: 'Invoiced',
        value: 4000,
        close_date: Date.UTC(2024, 4, 11)
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Projects';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
        'Project 1',
        'Project 2',
        'Project 3',
        'Project 4',
        'Project 5'
      ] }
    }, {});
  }
};
