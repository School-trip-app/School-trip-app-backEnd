"use strict";


module.exports = (sequelize, DataTypes) => {
  
  const tripsOrdersModel = sequelize.define("tripOrder", {
    userId: { type: DataTypes.INTEGER, allowNull: true },
    packageId: { type: DataTypes.INTEGER, allowNull: true },
    productIds: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true },
    photographerId: { type: DataTypes.INTEGER, allowNull: true },
    medicalIssues: { type: DataTypes.STRING, allowNull: true},
    specialFood: { type: DataTypes.STRING, allowNull: true },
    notes: { type: DataTypes.STRING, allowNull: true },
    totalPric: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  })
  return tripsOrdersModel;
}
