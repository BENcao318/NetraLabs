'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Hackathon extends Model {
    static associate(models) {
      Hackathon.hasMany(models.Challenge, {
        foreignKey: 'hackathon_id',
      })
      Hackathon.hasMany(models.Project, {
        foreignKey: 'hackathon_id',
      })
      Hackathon.belongsTo(models.User, {
        foreignKey: 'user_id',
      })
    }
  }

  Hackathon.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      rules: DataTypes.TEXT,
      tagline: DataTypes.STRING,
      manager_email: DataTypes.STRING,
      location: DataTypes.TEXT,
      time_zone: DataTypes.JSON,
      start_time: DataTypes.DATE, // new
      deadline: DataTypes.DATE, // new
      prizes: DataTypes.JSON,
      judges: DataTypes.TEXT,
      requirements: DataTypes.TEXT,
      about: DataTypes.TEXT,
      partners: DataTypes.TEXT,
      created_at: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
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
