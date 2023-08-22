'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      // Team.belongsTo(models.User, {
      //   as: 'teamLeader',
      //   foreignKey: 'team_leader_id',
      // })
      Team.belongsTo(models.Hackathon, { foreignKey: 'hackathon_id' })
      Team.belongsTo(models.Project, { foreignKey: 'team_id' })
      Team.belongsToMany(models.User, {
        through: models.UserHackathon,
        foreignKey: 'team_id',
      })
    }
  }

  Team.init(
    {
      name: DataTypes.STRING,
      created_at: DataTypes.DATE,
      team_leader_id: DataTypes.INTEGER,
      hackathon_id: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: 'teams',
      modelName: 'Team',
    }
  )

  return Team
}
