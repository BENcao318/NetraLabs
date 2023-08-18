'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Team, { foreignKey: 'team_id' })
      Project.belongsTo(models.Hackathon, {
        foreignKey: 'hackathon_id',
      })
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      challenge_id: DataTypes.INTEGER,
      submission_video_url: DataTypes.STRING,
      pitch: DataTypes.TEXT,
      tech_stack: DataTypes.JSON,
      team_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'projects',
      modelName: 'Project',
    }
  )
  return Project
}
