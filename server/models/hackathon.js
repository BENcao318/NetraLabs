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
      title: DataTypes.STRING,
      company: DataTypes.STRING,
      description: DataTypes.TEXT,
      rules: DataTypes.TEXT,
      tagline: DataTypes.STRING,
      manager_email: DataTypes.STRING,
      time_zone: DataTypes.STRING,
      start_time: DataTypes.TIMESTAMP, // new
      deadline: DataTypes.TIMESTAMP, // new
      challenges: DataTypes.JSON,
      prizes: DataTypes.JSON,
      first_prize_amount: DataTypes.INTEGER,
      second_prize_amount: DataTypes.INTEGER,
      third_prize_amount: DataTypes.INTEGER,
      first_prize: DataTypes.STRING,
      second_prize: DataTypes.STRING,
      third_prize: DataTypes.STRING,
      judges: DataTypes.TEXT,
      skills_needed: DataTypes.ARRAY(DataTypes.STRING),
      criteria: DataTypes.ARRAY(DataTypes.STRING),
      requirements: DataTypes.TEXT,
      about: DataTypes.TEXT,
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
