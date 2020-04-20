'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
      resetPasswordTokenExpiration: DataTypes.DATE
    },
    {}
  )
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}
