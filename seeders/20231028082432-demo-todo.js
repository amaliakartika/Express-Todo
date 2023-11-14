'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Todos', [
      {
        title: 'Membeli telur',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Membuat kue',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Hapus semua data yang dimasukkan pada up method
    await queryInterface.bulkDelete('Todos', null, {});
  },
};
