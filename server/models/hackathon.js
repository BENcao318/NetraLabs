'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hackathon extends Model {
    static associate(models) {
      Hackathon.belongsTo(models.Challenge, {
        foreignKey: 'hackathonId',
      });
    }
  }

  Hackathon.init(
    {
      title: DataTypes.STRING,
      company: DataTypes.STRING,
      description: DataTypes.TEXT,
      rules: DataTypes.TEXT,
      tagline: DataTypes.STRING,
      managerEmail: DataTypes.STRING,
      themes: DataTypes.ARRAY(DataTypes.STRING),
      timeZone: DataTypes.STRING,
      deadline: DataTypes.DATE,
      firstPrizeAmount: DataTypes.INTEGER,
      secondPrizeAmount: DataTypes.INTEGER,
      thirdPrizeAmount: DataTypes.INTEGER,
      firstPrize: DataTypes.STRING,
      secondPrize: DataTypes.STRING,
      thirdPrize: DataTypes.STRING,
      judges: DataTypes.ARRAY(DataTypes.STRING),
      skillsNeeded: DataTypes.ARRAY(DataTypes.STRING),
      criteria: DataTypes.ARRAY(DataTypes.STRING),
      requirements: DataTypes.ARRAY(DataTypes.STRING),
      about: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Hackathon',
    }
  );

  return Hackathon;
};
