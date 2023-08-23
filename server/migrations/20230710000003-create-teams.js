'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.TEXT,
      },
      team_leader_id: {
        type: Sequelize.INTEGER,
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      // },
      challenge_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'challenges',
          key: 'id',
        },
      },
      hackathon_id: {
        type: Sequelize.UUID,
      },
      project_id: {
        type: Sequelize.UUID,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams')
  },
}
