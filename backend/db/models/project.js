'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'rep_id',
        as: 'Rep'
      })
      this.belongsTo(models.Contact, {
        foreignKey: 'contact_id'
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
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rep_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contact_id: {
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
    close_date: {
      type: DataTypes.DATEONLY
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
