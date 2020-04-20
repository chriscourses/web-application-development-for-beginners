module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // name of database table
        'resetPasswordToken', // name of the key we're adding
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users', // name of database table
        'resetPasswordTokenExpiration', // name of the key we're adding
        {
          type: Sequelize.DATE
        }
      )
    ]).catch(() => undefined)
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Users', // name of database table
        'resetPasswordToken' // key we want to remove
      ),
      queryInterface.removeColumn(
        'Users', // name of database table
        'resetPasswordTokenExpiration' // key we want to remove
      )
    ]).catch(() => undefined)
  }
}
