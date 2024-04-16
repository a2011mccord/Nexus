'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Contact } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Contact.bulkCreate([
      {
        user_id: 1,
        team_id: 1,
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bob.smith@gmail.com',
        phone_number: '123-456-7890',
        type: 'Lead'
      },
      {
        user_id: 1,
        team_id: 1,
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@gmail.com',
        phone_number: '234-567-8901',
        type: 'Customer'
      },
      {
        user_id: 1,
        team_id: 1,
        first_name: 'John',
        last_name: 'Johnson',
        email: 'john.johnson@gmail.com',
        phone_number: '987-654-3210',
        type: 'Partner'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Contacts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: [
        'bob.smith@gmail.com',
        'jane.doe@gmail.com',
        'john.johnson@gmail.com'
      ] }
    }, {});
  }
};
