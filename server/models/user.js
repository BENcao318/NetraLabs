'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Team, {
        through: models.UserTeam,
        foreignKey: 'user_id',
      })
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      role: DataTypes.JSON,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      skills: JSON,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  )

  return User
}
