'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users',
            [
                {
                    username: 'John Doe',
                    password: '123456',
                    email: "john@example.com"
                },
                {
                    username: 'John Doe2',
                    password: '123456',
                    email: "john@example.com"
                },
                {
                    username: 'John Doe3',
                    password: '123456',
                    email: "john@example.com"
                },
                {
                    username: 'John Doe4',
                    password: '123456',
                    email: "john@example.com"
                }

            ],
            {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
