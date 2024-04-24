'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA;
};

options.tableName = 'Projects';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      teamId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      repId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      contactId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.INTEGER
      },
      closeDate: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};
