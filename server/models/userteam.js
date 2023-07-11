'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTeam extends Model {
    static associate(models) {
      UserTeam.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      UserTeam.belongsTo(models.Team, {
        foreignKey: 'team_id',
      });
    }
  }

  UserTeam.init(
    {
      user_id: DataTypes.INTEGER,
      team_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'user_teams',
      modelName: 'UserTeam',
    }
  );

  return UserTeam;
};
