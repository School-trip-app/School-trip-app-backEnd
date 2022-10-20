"use strict";

function createProductOrderTable(sequelize, DataTypes) {
  return (
    sequelize.define("productOrder", {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },      
			orderQuentity: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
      deliveryDate: { type: DataTypes.STRING, allowNull: false },
      contactInfo: { type: DataTypes.STRING, allowNull: false },
      deliveryLocation: { type: DataTypes.STRING, allowNull: false }
    })
  );
}
module.exports = { createProductOrderTable };