'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserHackathon extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  UserHackathon.init(
    {
      // You can define additional attributes here if needed
    },
    {
      sequelize,
      modelName: 'UserHackathon',
      tableName: 'userhackathons', // Make sure the table name matches your existing table
      timestamps: false, // If there are no timestamp columns in the association table
    }
  )

  return UserHackathon
}
