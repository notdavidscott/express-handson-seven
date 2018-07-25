'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    UserId: {
      allowNull: false,
      autoIncrement: true, 
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true
    },
    Username: { 
     type: DataTypes.STRING,
     unique: true
    },
    Password: DataTypes.STRING,
    Admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Deleted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE, 
    updatedAt: DataTypes.DATE
  }, {
  }
);
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};