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
      Project.belongsTo(models.Hackathon, { foreignKey: 'hackathon_id' })
      Project.hasOne(models.Team, { foreignKey: 'project_id' })
      Project.belongsToMany(models.User, {
        through: models.UserProject,
        foreignKey: 'project_id',
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
      story: DataTypes.TEXT,
      tech_stack: DataTypes.JSON,
      video_url: DataTypes.TEXT,
      repository_url: DataTypes.TEXT,
      hackathon_id: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: 'projects',
      modelName: 'Project',
    }
  )
  return Project
}
