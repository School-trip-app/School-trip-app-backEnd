"use strict";

function createTripsOrderTable(sequelize, DataTypes) {
  return (
    sequelize.define("tripOrders", {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      packageId: { type: DataTypes.INTEGER, allowNull: false },
      notes: { type: DataTypes.STRING },
      photogerId:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    })
  )
}
module.exports = { createTripsOrderTable };