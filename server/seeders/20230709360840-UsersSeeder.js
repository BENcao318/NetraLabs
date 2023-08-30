'use strict'
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await generateUsers()

    await queryInterface.bulkInsert('users', usersData, {})
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all rows from the users table when undoing the seeder
    await queryInterface.bulkDelete('Users', null, {})
  },
}

const roles = [
  'Full-stack developer',
  'Front-end developer',
  'Back-end developer',
  'UI Designer',
  'Data Scientist',
  'Product Manager',
  'Business Manager',
]

const skills = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'go', label: 'Go' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'django', label: 'Django' },
  { value: 'spring', label: 'Spring Boot' },
  { value: 'express', label: 'Express.js' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'dotnet', label: '.NET' },
  { value: 'php', label: 'PHP' },
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'aws', label: 'Amazon Web Services' },
  { value: 'azure', label: 'Microsoft Azure' },
  { value: 'aws', label: 'Amazon Web Services' },
  { value: 'azure', label: 'Microsoft Azure' },
  { value: 'gcp', label: 'Google Cloud Platform' },
  { value: 'heroku', label: 'Heroku' },
  { value: 'digitalocean', label: 'DigitalOcean' },
  { value: 'netlify', label: 'Netlify' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'redis', label: 'Redis' },
  { value: 'dynamodb', label: 'Amazon DynamoDB' },
  { value: 'firebase', label: 'Firebase Realtime Database' },
  { value: 'rest', label: 'RESTful API' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'soap', label: 'SOAP' },
  { value: 'jsonrpc', label: 'JSON-RPC' },
  { value: 'grpc', label: 'gRPC' },
  { value: 'oauth', label: 'OAuth' },
  { value: 'jwt', label: 'JSON Web Tokens (JWT)' },
  { value: 'openapi', label: 'OpenAPI' },
]
let usersData = [
  {
    id: 'aa11f12c-1b6a-48a6-bece-b85e7cad601c',
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
    password: '$2b$10$mFaxo0BsAtrfOiji2D1DCO7jPnCxgigOvhabJ4SqNH7RMDa0U4pSa', // Replace with the hashed password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7eff81ca-5f3c-49e2-a53f-81dd58ee3435',
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
    password: '$2b$10$z2PlLvdppNciH7NWBG0SHOuQmI3BDoRNiBCQgbmz7012L7C9kA6eC', // Replace with the hashed password
    created_hackathons_id: [
      'd8f1c0f5-40d0-4f62-8f65-392cbdd049f9',
      '9da07f7a-8f0f-4b3c-b72b-35c4a1eecd8f',
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'c55b5cc1-e081-4e21-99bf-9be0d3ac8f83',
    isAdmin: false,
    role: 'full-stack engineer',
    firstName: 'Ben',
    lastName: 'Cao',
    company: 'NestraLabs',
    skills: JSON.stringify([
      { value: 'javascript', label: 'javascript' },
      { value: 'java', label: 'Java' },
      { value: 'Node.js', label: 'Node.js' },
    ]),
    email: 'bencao@gmail.com',
    password: '$2b$10$ud6Qsi2SeXQSCZwM02gVEeSlmc.qiv7Gkt.CU/jpJ.hIkoIfehjVO', // Replace with the hashed password
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

const generateUsers = async () => {
  for (let i = 0; i < 20; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)]
    const numberOfSkills = faker.number.int({ min: 1, max: 6 })
    const selectedSkills = faker.helpers
      .shuffle(skills)
      .slice(0, numberOfSkills)
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`

    const user = {
      id: uuidv4(),
      isAdmin: false,
      role: role,
      firstName: firstName,
      lastName: lastName,
      skills: JSON.stringify(selectedSkills),
      email: email,
      password: await bcrypt.hash('test1234', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    usersData.push(user)

    console.log(`User created with role: ${role}`)
  }
}
