'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner'
      })
      this.hasMany(models.Manager, {
        foreignKey: 'teamId'
      })
      this.hasMany(models.Member, {
        foreignKey: 'teamId'
      })
      this.hasMany(models.Project, {
        foreignKey: 'teamId'
      })
      this.hasMany(models.Contact, {
        foreignKey: 'teamId'
      })
    }
  }
  Team.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30]
      }
    }
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
