'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("admin", "customer"),
      defaultValue: "customer",
    },
  }, {
    sequelize,
    modelName: 'User',
  });

const bcrypt = require('bcrypt');

  return User;
};