'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invitation.belongsTo(models.User, { foreignKey: 'invitee_id' })
      Invitation.belongsTo(models.Project, { foreignKey: 'project_id' })
    }
  }
  Invitation.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      project_id: DataTypes.UUID,
      invitee_id: DataTypes.UUID,
      viewed_by_invitee: DataTypes.BOOLEAN,
      accepted_offer: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: 'invitations',
      modelName: 'Invitation',
    }
  )
  return Invitation
}
