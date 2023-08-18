'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      challenge_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'challenges',
          key: 'id',
        },
      },
      hackathon_id: {
        type: Sequelize.UUID,
        references: {
          model: 'hackathons',
          key: 'id',
        },
      },
      story: {
        type: Sequelize.TEXT,
      },
      submission_video_url: {
        type: Sequelize.STRING,
      },
      pitch: {
        type: Sequelize.TEXT,
      },
      tech_stack: {
        type: Sequelize.JSON,
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects')
  },
}
