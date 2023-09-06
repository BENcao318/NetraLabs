'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      challenge_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      hackathon_id: {
        type: Sequelize.UUID,
      },
      story: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      submission_video_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pitch: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tech_stack: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      video_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      repository_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      hackathon_id: {
        type: Sequelize.UUID,
      },
      submitted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('projects')
  },
}
