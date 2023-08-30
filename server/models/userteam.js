'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserTeam extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  UserTeam.init(
    {
      // You can define additional attributes here if needed
      user_id: {
        type: DataTypes.UUID,
      },
      team_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'UserTeam',
      tableName: 'userteams', // Make sure the table name matches your existing table
      timestamps: false, // If there are no timestamp columns in the association table
    }
  )

  return UserTeam
}
