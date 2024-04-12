'use strict';
/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob.smith@user.io',
        username: 'BobSmith',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@user.io',
        username: 'JaneDoe',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'BobSmith', 'JaneDoe'] }
    }, {});
  }
};
