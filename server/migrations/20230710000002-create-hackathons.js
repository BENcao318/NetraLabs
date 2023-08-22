'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hackathons', {
      id: {
        allowNull: false,
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
      launched: {
        type: Sequelize.BOOLEAN,
      },
      company: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      // },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hackathons')
  },
}
