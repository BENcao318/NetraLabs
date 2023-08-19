'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.belongsTo(models.User, { foreignKey: 'team_leader_id' })
      Team.belongsTo(models.Project, { foreignKey: 'project_id' })
      Team.belongsTo(models.Hackathon, { foreignKey: 'hackathon_id' })
    }
  }

  Team.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'teams',
      modelName: 'Team',
    }
  )

  return Team
}
