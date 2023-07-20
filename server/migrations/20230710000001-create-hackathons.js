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
      title: {
        type: Sequelize.STRING,
      },
      company: {
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
        type: Sequelize.STRING,
      },
      deadline: {
        type: Sequelize.DATE,
      },
      first_prize_amount: {
        type: Sequelize.INTEGER,
      },
      second_prize_amount: {
        type: Sequelize.INTEGER,
      },
      third_prize_amount: {
        type: Sequelize.INTEGER,
      },
      first_prize: {
        type: Sequelize.STRING,
      },
      second_prize: {
        type: Sequelize.STRING,
      },
      third_prize: {
        type: Sequelize.STRING,
      },
      judges: {
        type: Sequelize.TEXT,
      },
      skills_needed: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      criteria: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      requirements: {
        type: Sequelize.TEXT,
      },
      about: {
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
