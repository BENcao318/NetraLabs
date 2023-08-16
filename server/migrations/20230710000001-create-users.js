'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      skills: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  },
}
