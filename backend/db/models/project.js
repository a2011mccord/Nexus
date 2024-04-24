'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'repId',
        as: 'Rep'
      })
      this.belongsTo(models.Contact, {
        foreignKey: 'contactId'
      })
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30]
      }
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    repId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
    },
    closeDate: {
      type: DataTypes.DATEONLY
    }
  }, {
    sequelize,
    modelName: 'Project',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Project;
};
