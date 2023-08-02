'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Hackathon extends Model {
    static associate(models) {
      Hackathon.hasMany(models.Challenge, {
        foreignKey: 'hackathon_id',
      })
    }
  }

  Hackathon.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      rules: DataTypes.TEXT,
      tagline: DataTypes.STRING,
      manager_email: DataTypes.STRING,
      time_zone: DataTypes.JSON,
      start_time: DataTypes.DATE, // new
      deadline: DataTypes.DATE, // new
      prizes: DataTypes.JSON,
      judges: DataTypes.TEXT,
      requirements: DataTypes.TEXT,
      about: DataTypes.TEXT,
      partners: DataTypes.TEXT,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Hackathon',
      tableName: 'hackathons',
      timestamps: false,
    }
  )

  return Hackathon
}
