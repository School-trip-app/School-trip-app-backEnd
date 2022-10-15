"use strict";

function createPackageDetailsTable(sequelize, DataTypes) {
  return (
    sequelize.define("packageDetails", {
      packageId: { type: DataTypes.INTEGER, allowNull: false },
      locationURL: { type: DataTypes.STRING, allowNull: false },
      tripDate: { type: DataTypes.DATEONLY, allowNull: false },
      numberOfPeople: { type: DataTypes.INTEGER, allowNull: false },
      startingTime: { type: DataTypes.STRING, allowNull: false },
      endingTime: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      meals: { type: DataTypes.STRING }
    })
  )
}
module.exports = { createPackageDetailsTable };
