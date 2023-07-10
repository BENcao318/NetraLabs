'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.belongsTo(models.User, {
        foreignKey: 'teamLeaderId',
      });
      Team.belongsTo(models.Challenge, {
        foreignKey: 'challengeId',
      });
      Team.belongsToMany(models.User, {
        through: models.UserTeam,
        foreignKey: 'teamId',
      });
    }
  }

  Team.init(
    {
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Team',
    }
  );

  return Team;
};
