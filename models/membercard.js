'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MemberCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MemberCard.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  MemberCard.init({
    type: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MemberCard',
  });
  return MemberCard;
};