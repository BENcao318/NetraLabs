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
    await queryInterface.bulkInsert('challenges', [
      {
        id: 1,
        hackathon_id: 1,
        name: 'Climate Finance: Harmonizing ESG Investing to Support Net Zero Targets',
        body: 'As the world strives to achieve net-zero emissions, sustainable finance plays a crucial role in funding climate-related initiatives. The Climate Finance challenge focuses on Environmental, Social, and Governance (ESG) investing, aiming to harmonize ESG criteria and metrics to support net-zero targets. Participants will explore how technology can enable better assessment, reporting, and integration of ESG factors into investment decision-making processes.',
        created_at: new Date(),
      },
      // Add more challenge data as needed
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
