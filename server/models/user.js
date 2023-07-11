'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Team, {
        through: models.UserTeam,
        foreignKey: 'user_id',
      });
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      role: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      skills: DataTypes.ARRAY(DataTypes.STRING),
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );

  return User;
};
