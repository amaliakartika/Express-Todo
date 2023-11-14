'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Menambahkan data pengguna ke dalam tabel
    await queryInterface.bulkInsert('Users', [{
      username: 'amalia18',
      password: '123456', // Gantilah dengan kata sandi yang sudah di-hash
      email: 'amalia@gmail.com',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      username: 'kartika08',
      password: '789101', // Gantilah dengan kata sandi yang sudah di-hash
      email: 'kartika@gmail.com',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};