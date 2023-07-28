'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hackathons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      time_zone: {
        type: Sequelize.TEXT,
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
      created_at: {
        type: Sequelize.DATE,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hackathons')
  },
}
