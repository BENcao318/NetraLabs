'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.belongsTo(models.User, {
        foreignKey: 'teamLeader_id',
      });
      Team.belongsTo(models.Challenge, {
        foreignKey: 'challenge_id',
      });
      Team.belongsToMany(models.User, {
        through: models.UserTeam,
        foreignKey: 'team_id',
      });
    }
  }

  Team.init(
    {
      name: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'teams',
      modelName: 'Team',
    }
  );

  return Team;
};
