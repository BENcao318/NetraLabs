'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTeam extends Model {
    static associate(models) {
      UserTeam.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      UserTeam.belongsTo(models.Team, {
        foreignKey: 'teamId',
      });
    }
  }

  UserTeam.init(
    {
      userId: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserTeam',
    }
  );

  return UserTeam;
};
