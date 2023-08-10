'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hackathons', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      rules: {
        type: Sequelize.TEXT,
      },
      tagline: {
        type: Sequelize.STRING,
      },
      manager_email: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.TEXT,
      },
      time_zone: {
        type: Sequelize.JSON,
      },
      start_time: {
        type: Sequelize.DATE,
      },
      deadline: {
        type: Sequelize.DATE,
      },
      prizes: {
        type: Sequelize.JSON,
      },
      judges: {
        type: Sequelize.TEXT,
      },
      requirements: {
        type: Sequelize.TEXT,
      },
      about: {
        type: Sequelize.TEXT,
      },
      partners: {
        type: Sequelize.TEXT,
      },
      resources: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hackathons')
  },
}
