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
        userId: 1,
        teamId: 1,
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob.smith@gmail.com',
        phoneNumber: '123-456-7890',
        type: 'Lead'
      },
      {
        userId: 1,
        teamId: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@gmail.com',
        phoneNumber: '234-567-8901',
        type: 'Customer'
      },
      {
        userId: 1,
        teamId: 1,
        firstName: 'John',
        lastName: 'Johnson',
        email: 'john.johnson@gmail.com',
        phoneNumber: '987-654-3210',
        type: 'Partner'
      },
      {
        userId: 2,
        teamId: 1,
        firstName: 'Fake',
        lastName: 'Contact1',
        email: 'fake.contact1@gmail.com',
        phoneNumber: '111-111-1111',
        type: 'Lead'
      },
      {
        userId: 3,
        teamId: 1,
        firstName: 'Fake',
        lastName: 'Contact2',
        email: 'fake.contact2@gmail.com',
        phoneNumber: '222-222-2222',
        type: 'Lead'
      },
      {
        userId: 4,
        teamId: 1,
        firstName: 'Fake',
        lastName: 'Contact3',
        email: 'fake.contact3@gmail.com',
        phoneNumber: '333-333-3333',
        type: 'Lead'
      },
      {
        userId: 5,
        teamId: 2,
        firstName: 'Fake',
        lastName: 'Contact4',
        email: 'fake.contact4@gmail.com',
        phoneNumber: '444-444-4444',
        type: 'Lead'
      },
      {
        userId: 6,
        teamId: 2,
        firstName: 'Fake',
        lastName: 'Contact5',
        email: 'fake.contact5@gmail.com',
        phoneNumber: '555-555-5555',
        type: 'Lead'
      },
      {
        userId:7,
        teamId: 2,
        firstName: 'Fake',
        lastName: 'Contact6',
        email: 'fake.contact6@gmail.com',
        phoneNumber: '666-666-6666',
        type: 'Lead'
      },
      {
        userId: 8,
        teamId: 2,
        firstName: 'Fake',
        lastName: 'Contact7',
        email: 'fake.contact7@gmail.com',
        phoneNumber: '777-777-7777',
        type: 'Lead'
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
        'john.johnson@gmail.com',
        'fake.contact1@gmail.com',
        'fake.contact2@gmail.com',
        'fake.contact3@gmail.com',
        'fake.contact4@gmail.com',
        'fake.contact5@gmail.com',
        'fake.contact6@gmail.com',
        'fake.contact7@gmail.com'
      ] }
    }, {});
  }
};
