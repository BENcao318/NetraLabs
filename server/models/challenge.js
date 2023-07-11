'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    static associate(models) {
      Challenge.belongsTo(models.Hackathon, {
        foreignKey: 'hackathon_id',
      });
      Challenge.hasMany(models.Project, {
        foreignKey: 'challenge_id',
      });
      Challenge.belongsTo(models.Team, {
        foreignKey: 'challenge_id',
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
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'challenges',
      modelName: 'Challenge',
    }
  );

  return Challenge;
};
