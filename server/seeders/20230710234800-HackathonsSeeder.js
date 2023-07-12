'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
        title: 'Virtual Inter-University Coding Hackathon',
        company: 'NetraScale',
        description: `Welcome to the NetraLabs University-Business Hackathon Summer 2023, an exciting event where students will have the opportunity to tackle pressing societal and business problems using out of the box thinking, cutting-edge technologies and a disruptive mindset.
        
The event takes place between 28 - 29 June 2023 and is open to students and tech professionals around the world. See the full programme on the subsequent slides.
        
On the Day 1 of the hackathon, five thematic challenges will be announced for teams to choose from. These challenges are designed to address critical issues and encourage participants to apply their skills and creativity in innovative ways.`,
        rules: `• Business innovation 
        • Contribution to society
        • Originality
        • End user experience
        • Team collaboration
        • Use of technologies provided`,
        tagline: 'Join us for an exciting hackathon!',
        manager_email: 'manager@example.com',
        time_zone: 'EST',
        deadline: new Date('2023-07-31'),
        first_prize_amount: 2500,
        second_prize_amount: 1500,
        third_prize_amount: 500,
        first_prize: 'First Prize',
        second_prize: 'Second Prize',
        third_prize: 'Third Prize',
        judges: ['Bonnie Schneider', 'Alex Sharpe','David Carlin'],
        skills_needed: ['Programming', 'Design'],
        criteria: ['Creativity', 'Functionality'],
        requirements: ['Team of 3-6 members', 'Minimum age 18'],
        about: `Hacking is where teams of 3-5 individuals come together to creatively solve problems. Training and support workshops will run parallel to the Hackathon, providing useful skills development and insight into the challenges set.  

        The Hackathon will build essential skills for students in developing business and consumer solutions across Artificial Intelligence, Machine Learning, Blockchain, Natural Language Processing, APIs, Cloud, Mobile, Data Analytics, Internet of Things, Robotics Process Automation and other in-demand non-tech skills such as project management, leadership, teamwork and communication. 
        
        Newcomers and more experienced hackers are welcome! `,
        created_at: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('hackathons', null, {});
  }
};
