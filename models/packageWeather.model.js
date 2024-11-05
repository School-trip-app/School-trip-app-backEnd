"use strict";

module.exports = (sequelize, DataTypes) => {
  const packageWeatherModel = sequelize.define("packageWeatherDetails", {
    packageId: { type: DataTypes.INTEGER, allowNull: true },
    temp: { type: DataTypes.STRING, allowNull: true },
    maxTemp: { type: DataTypes.STRING, allowNull: true },
    minTemp: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    windSpeed: { type: DataTypes.STRING },
  })
  return packageWeatherModel;
}

