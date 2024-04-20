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
        teamId: 1,
        repId: 1,
        contactId: 1,
        stage: 'Lead',
        value: 10000,
        closeDate: new Date('2024-6-1').toISOString().split('T')[0]
      },
      {
        name: 'Project 2',
        teamId: 1,
        repId: 1,
        contactId: 2,
        stage: 'Prospect',
        value: 3000,
        closeDate: new Date('2024-5-20').toISOString().split('T')[0]
      },
      {
        name: 'Project 3',
        teamId: 1,
        repId: 1,
        contactId: 3,
        stage: 'Approved',
        value: 5000,
        closeDate: new Date('2024-6-15').toISOString().split('T')[0]
      },
      {
        name: 'Project 4',
        teamId: 1,
        repId: 1,
        contactId: 1,
        stage: 'Completed',
        value: 8000,
        closeDate: new Date('2024-4-20').toISOString().split('T')[0]
      },
      {
        name: 'Project 5',
        teamId: 1,
        repId: 1,
        contactId: 2,
        stage: 'Invoiced',
        value: 4000,
        closeDate: new Date('2024-4-11').toISOString().split('T')[0]
      },
      {
        name: 'Project 6',
        teamId: 1,
        repId: 2,
        contactId: 4,
        stage: 'Prospect',
        value: 14000,
        closeDate: new Date('2024-7-1').toISOString().split('T')[0]
      },
      {
        name: 'Project 7',
        teamId: 1,
        repId: 3,
        contactId: 5,
        stage: 'Approved',
        value: 7000,
        closeDate: new Date('2024-5-25').toISOString().split('T')[0]
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
