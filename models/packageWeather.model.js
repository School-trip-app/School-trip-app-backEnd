"use strict";

function createPackageWeatherTable(sequelize, DataTypes) {
  return (
    sequelize.define("packageWeatherDetails", {
      packageId: { type: DataTypes.INTEGER, allowNull: false },
      temp: { type: DataTypes.STRING, allowNull: false },
      maxTemp: { type: DataTypes.STRING, allowNull: false },
      minTemp: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      windSpeed: { type: DataTypes.STRING },
    })
  )
}

module.exports = { createPackageWeatherTable };
