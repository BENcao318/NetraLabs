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
    await queryInterface.bulkInsert('challenges', [
      {
        id: 1,
        hackathon_id: 1,
        title: 'Climate Finance: Harmonizing ESG Investing to Support Net Zero Targets',
        body: 'As the world strives to achieve net-zero emissions, sustainable finance plays a crucial role in funding climate-related initiatives. The Climate Finance challenge focuses on Environmental, Social, and Governance (ESG) investing, aiming to harmonize ESG criteria and metrics to support net-zero targets. Participants will explore how technology can enable better assessment, reporting, and integration of ESG factors into investment decision-making processes.',
        created_at: new Date(),
      },
      {
        id: 2,
        hackathon_id: 1,
        title: 'FinTech: Harnessing the Power of Large Language Models (LLMs) for Investment Portfolio Optimization',
        body: 'In the rapidly evolving landscape of finance, the optimization of investment portfolios has become increasingly intricate. This FinTech challenge focuses on leveraging the capabilities of Large Language Models (LLMs) like ChatGPT4 to revolutionize investment portfolio optimization. Participants will explore how LLMs can analyze vast amounts of financial data, apply advanced natural language processing techniques, and utilize machine learning algorithms to provide sophisticated insights and recommendations. By harnessing the power of LLMs, participants will develop innovative solutions that empower investors to make informed decisions and optimize their portfolios in the dynamic world of finance.',
        created_at: new Date(),
      },
      // Add more challenge data as needed
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
