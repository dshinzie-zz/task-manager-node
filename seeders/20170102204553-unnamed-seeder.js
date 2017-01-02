'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    console.log("Insert Tasks");
    return queryInterface.bulkInsert('Tasks', [
      { title: 'Task One', description: "Description One", createdAt: new Date(), updatedAt: new Date() },
      { title: 'Task Two', description: "Description Two", createdAt: new Date(), updatedAt: new Date() },
      { title: 'Task Three', description: "Description Three", createdAt: new Date(), updatedAt: new Date() },
      { title: 'Task Four', description: "Description Four", createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
