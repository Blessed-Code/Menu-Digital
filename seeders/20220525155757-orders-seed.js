'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: falseid
     * }], {});
    */
   const data = [
     {status: "completed", UserId: 2, createdAt: new Date(), updatedAt: new Date()},
     {status: "completed", UserId: 2, createdAt: new Date(), updatedAt: new Date()},
     {status: "completed", UserId: 1, createdAt: new Date(), updatedAt: new Date()},
     {status: "completed", UserId: 1, createdAt: new Date(), updatedAt: new Date()},
     {status: "completed", UserId: 3, createdAt: new Date(), updatedAt: new Date()}
   ]
   return queryInterface.bulkInsert('Orders', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Orders', null, {})
  }
};
