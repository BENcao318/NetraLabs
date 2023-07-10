'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    static associate(models) {
      Challenge.belongsTo(models.Hackathon, {
        foreignKey: 'hackathonId',
      });
      Challenge.hasMany(models.Project, {
        foreignKey: 'challengeId',
      });
      Challenge.belongsTo(models.Team, {
        foreignKey: 'challengeId',
      });
    }
  }

  Challenge.init(
    {
      title: DataTypes.STRING,
      body: {
        type: DataTypes.TEXT,
        comment: 'description of the challenge',
      },
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Challenge',
    }
  );

  return Challenge;
};
