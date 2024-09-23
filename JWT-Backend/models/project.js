'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.User, {
        through: 'ProjectUser'
      });
    }
  }
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    customerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};