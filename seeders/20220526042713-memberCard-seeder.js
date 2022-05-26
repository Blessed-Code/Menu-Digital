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
     {type: "Gold", UserId: 1, createdAt: new Date(), updatedAt: new Date()},
     {type: "Regular", UserId: 2, createdAt: new Date(), updatedAt: new Date()},
     {type: "Gold", UserId: 3, createdAt: new Date(), updatedAt: new Date()},
     {type: "Regular", UserId: 4, createdAt: new Date(), updatedAt: new Date()},
     {type: "Gold", UserId: 5, createdAt: new Date(), updatedAt: new Date()},
     {type: "Gold", UserId: 6, createdAt: new Date(), updatedAt: new Date()},
     {type: "Regular", UserId: 7, createdAt: new Date(), updatedAt: new Date()},
     {type: "Gold", UserId: 8, createdAt: new Date(), updatedAt: new Date()},
     {type: "Regular", UserId: 9, createdAt: new Date(), updatedAt: new Date()},
     {type: "Gold", UserId: 10, createdAt: new Date(), updatedAt: new Date()},
   ]
   return queryInterface.bulkInsert('MemberCards', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('MemberCards', null, {})
  }
};
