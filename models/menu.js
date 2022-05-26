'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.OrderMenu, {foreignKey: 'MenuId'})
      Menu.belongsToMany(models.Order, {through: models.OrderMenu})
    }
    convertPrice(){
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.price)
    }
  }
  Menu.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: "Name of the menu is required"},
        notEmpty: {msg: "Name of the menu is required"}
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: "Image Link is required"},
        notEmpty: {msg: "Image Link is required"},
        isUrl: {msg: "The image link should be in link format"}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Price is required"},
        min: {
          args: [0],
          msg: "The price should be more than 0 IDR"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Category Menu should be selected"},
        notEmpty: {msg: "Category Menu should be selected"}
      }
    }
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};