'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = [
     {OrderId: 1, MenuId: 2, createdAt: new Date(), updatedAt: new Date()},
     {OrderId: 2, MenuId: 2, createdAt: new Date(), updatedAt: new Date()},
     {OrderId: 2, MenuId: 1, createdAt: new Date(), updatedAt: new Date()},
     {OrderId: 1, MenuId: 1, createdAt: new Date(), updatedAt: new Date()}
   ]
   return queryInterface.bulkInsert('OrderMenus', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('OrderMenus', null, {})
  }
};
