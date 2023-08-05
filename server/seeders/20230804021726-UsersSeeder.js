'use strict'

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const usersData = [
      {
        isAdmin: false,
        role: ['fulltack engineer'],
        name: 'John Doe',
        skills: ['JavaScript', 'Node.js', 'Sequelize'],
        email: 'john.doe@example.com',
        password: 'hashed_password_here', // Replace with the hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more user data objects as needed
      // For example:
      // {
      //   role: { isAdmin: false },
      //   name: 'Jane Smith',
      //   skills: ['Python', 'SQL'],
      //   email: 'jane.smith@example.com',
      //   password: 'hashed_password_here',
      //   created_at: new Date(),
      // },
    ]

    await queryInterface.bulkInsert('users', usersData, {})
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all rows from the users table when undoing the seeder
    await queryInterface.bulkDelete('users', null, {})
  },
}
