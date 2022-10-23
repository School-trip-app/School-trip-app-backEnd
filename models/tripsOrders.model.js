"use strict";


module.exports = (sequelize, DataTypes) => {
  
  const tripsOrdersModel = sequelize.define("tripOrder", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    packageId: { type: DataTypes.INTEGER, allowNull: false },
    productIds: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true },
    photographerId: { type: DataTypes.INTEGER, allowNull: true },
    medicalIssues: { type: DataTypes.STRING },
    specialFood: { type: DataTypes.STRING },
    notes: { type: DataTypes.STRING },
    totalPric: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  })
  return tripsOrdersModel;
}
