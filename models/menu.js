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
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};