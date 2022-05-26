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
     {name: "Rendang", imageUrl: "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2018/04/makanan-khas-padang-1-wikimedia.jpg", price: 20_000, category: "Food", createdAt: new Date(), updatedAt: new Date()},
     {name: "Sate Padang", imageUrl: "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2018/04/makanan-khas-padang-2-wikimedia.jpg", price: 35_000, category: "Food", createdAt: new Date(), updatedAt: new Date()},
     {name: "Dendeng Balado", imageUrl: "https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2018/04/makanan-khas-padang-3-Wikimedia.jpg", price: 20_000, category: "Food", createdAt: new Date(), updatedAt: new Date()},
     {name: "Es Teh Manis", imageUrl: "https://kaspin.sgp1.digitaloceanspaces.com/DataGambar/255866/barang/M02.png", price: 5_000, category: "Drink", createdAt: new Date(), updatedAt: new Date()},
     {name: "Es Jeruk", imageUrl: "https://cf.shopee.co.id/file/2353d44f684e64b93ac9fb461119f21d", price: 5_000, category: "Drink", createdAt: new Date(), updatedAt: new Date()}
   ]
   return queryInterface.bulkInsert('Menus', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Menus', null, {})
  }
};
