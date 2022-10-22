"use strict";

function createProductOrderTable(sequelize, DataTypes) {
  return (
    sequelize.define("productOrder", {
      productId: { type: DataTypes.INTEGER, allowNull: false },      
			orderQuentity: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false }
    })
  );
}
module.exports = { createProductOrderTable };