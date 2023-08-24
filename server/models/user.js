'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Team, {
        through: models.UserTeam,
        foreignKey: 'user_id',
      })
      User.belongsToMany(models.Project, {
        through: models.UserProject,
        foreignKey: 'user_id',
      })
      User.belongsToMany(models.Hackathon, {
        through: models.UserHackathon,
        foreignKey: 'user_id',
      })
      User.hasMany(models.Invitation, {
        foreignKey: 'invitee_id',
      })
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: { type: DataTypes.TEXT, allowNull: true },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      skills: { type: DataTypes.JSON, allowNull: true },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      created_hackathons_id: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  )

  return User
}
