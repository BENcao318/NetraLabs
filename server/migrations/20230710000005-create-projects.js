'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      submission_video_url: {
        type: Sequelize.STRING,
      },
      pitch: {
        type: Sequelize.TEXT,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects');
  },
};
