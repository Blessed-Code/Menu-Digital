'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {foreignKey: 'UserId'})

      Order.hasMany(models.OrderMenu, {foreignKey: 'OrderId'})
      Order.belongsToMany(models.Menu, {through: models.OrderMenu})
    }
    get displayedStatus(){
      if(this.status === "completed"){
        return `[ ✓ ]`
      }else{
        return `[    ]`
      }
    }
    formattedDate(date){
      return date.toLocaleDateString('id-ID', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    }
  }
  Order.init({
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};