'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  UserProject.init(
    {
      // You can define additional attributes here if needed
    },
    {
      sequelize,
      modelName: 'UserProject',
      tableName: 'userprojects', // Make sure the table name matches your existing table
      timestamps: false, // If there are no timestamp columns in the association table
    }
  )

  return UserProject
}
