'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      this.belongsTo(models.Team, {
        foreignKey: 'teamId'
      })
    }
  }
  Manager.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Manager',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Manager;
};
