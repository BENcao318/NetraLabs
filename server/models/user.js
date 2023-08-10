'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Team, {
        through: models.UserTeam,
        foreignKey: 'user_id',
      })
      User.hasMany(models.Team, { foreignKey: 'team_leader_id' })
      User.hasMany(models.Hackathon, { foreignKey: 'user_id' })
    }
  }

  User.init(
    {
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      name: { type: DataTypes.STRING, allowNull: false },
      skills: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  )

  return User
}
