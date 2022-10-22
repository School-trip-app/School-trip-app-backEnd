"use strict";

function createTripsOrderTable(sequelize, DataTypes) {
  return (
    sequelize.define("tripOrder", {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      packageId: { type: DataTypes.INTEGER, allowNull: false },
      photographerId: { type: DataTypes.INTEGER, allowNull: true },
      medicalIssues: { type: DataTypes.STRING },
      specialFood: { type: DataTypes.STRING },
      notes: { type: DataTypes.STRING }
    })
  )
}

module.exports = { createTripsOrderTable };