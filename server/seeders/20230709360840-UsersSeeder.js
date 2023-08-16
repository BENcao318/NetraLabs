'use strict'

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const usersData = [
      {
        id: 1,
        isAdmin: false,
        role: 'full-stack developer',
        firstName: 'John',
        lastName: 'Doe',
        skills: JSON.stringify([
          { value: 'python', label: 'Python' },
          { value: 'java', label: 'Java' },
          { value: 'Node.js', label: 'Node.js' },
        ]),
        email: 'john.doe@example.com',
        password:
          '$2b$10$mFaxo0BsAtrfOiji2D1DCO7jPnCxgigOvhabJ4SqNH7RMDa0U4pSa', // Replace with the hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        isAdmin: true,
        role: 'product manager',
        firstName: 'Jane',
        lastName: 'Doe',
        company: 'NestraLabs',
        skills: JSON.stringify([
          { value: 'javascript', label: 'javascript' },
          { value: 'java', label: 'Java' },
          { value: 'Node.js', label: 'Node.js' },
        ]),
        email: 'benc.netrascale@gmail.com',
        password:
          '$2b$10$z2PlLvdppNciH7NWBG0SHOuQmI3BDoRNiBCQgbmz7012L7C9kA6eC', // Replace with the hashed password
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
