'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.MemberCard, {foreignKey: 'UserId'})
      User.hasMany(models.Order, {foreignKey: 'UserId'})
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: "username harus diisi"},
        notEmpty: {msg: "username harus diisi"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: "email harus diisi"},
        notEmpty: {msg: "email harus diisi"},
        isEmail: {msg: "email harus dalam format email yang benar"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "password harus diisi"},
        notEmpty: {msg: "password harus diisi"}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "role harus diisi"},
        notEmpty: {msg: "role harus diisi"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, options){
        let salt = bcryptjs.genSaltSync(8);
        let hash = bcryptjs.hashSync(user.password, salt);
        user.password = hash;
      }
    }
  });
  return User;
};