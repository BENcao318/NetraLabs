'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('challenges', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hackathon_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'hackathons',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
        comment: 'description of the challenge',
      },
      created_at: {
        type: Sequelize.DATE,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('challenges')
  },
}
