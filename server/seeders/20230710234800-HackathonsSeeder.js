'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('hackathons', [
      {
        name: 'Virtual Inter-University Coding Hackathon',
        description:
          '<h2><strong>🎉Welcome to the NetraLabs University-Business Hackathon Summer 2023!🎉🎉</strong></h2><h2><br></h2><h2>An exciting event where students will have the opportunity to tackle pressing societal and business problems using out of the box thinking, cutting-edge technologies and a disruptive mindset.</h2><h2>&nbsp; &nbsp;  </h2><h2>The event takes place between 28 - 29 June 2023 and is open to students and tech professionals around the world. See the full programme on the subsequent slides.</h2><h2>&nbsp; &nbsp; </h2><h2>On the Day 1 of the hackathon, five thematic challenges will be announced for teams to choose from. These challenges are designed to address critical issues and encourage participants to apply their skills and creativity in innovative ways.</h2>',
        rules: `• Business innovation 
        • Contribution to society
        • Originality
        • End user experience
        • Team collaboration
        • Use of technologies provided`,
        tagline: 'Join us for an exciting hackathon!',
        manager_email: 'manager@example.com',
        time_zone: JSON.stringify({ EST: 'Eastern Standard Time' }),
        start_time: new Date('2023-08-06T08:00:00Z'),
        deadline: new Date('2023-08-08T23:59:59Z'),
        prizes: JSON.stringify({ first_place: '$1000', second_place: '$500' }),
        judges: 'John Doe, Jane Smith',
        requirements:
          '<h2>• Business innovation </h2><h2>• Contribution to society</h2><h2>• Originality</h2><h2>• End-user experience</h2><h2>• Team collaboration</h2><h2>• Use of technologies provided</h2>',
        about: `Hacking is where teams of 3-5 individuals come together to creatively solve problems. Training and support workshops will run parallel to the Hackathon, providing useful skills development and insight into the challenges set.  

        The Hackathon will build essential skills for students in developing business and consumer solutions across Artificial Intelligence, Machine Learning, Blockchain, Natural Language Processing, APIs, Cloud, Mobile, Data Analytics, Internet of Things, Robotics Process Automation and other in-demand non-tech skills such as project management, leadership, teamwork and communication. 
        
        Newcomers and more experienced hackers are welcome! `,
        partners: 'Company A, Company B',
        created_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('hackathons', null, {})
  },
}
