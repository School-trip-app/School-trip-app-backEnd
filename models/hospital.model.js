"use strict";

module.exports = (sequelize, DataTypes) => {

  const hospitalModel = sequelize.define("Hospital", {
    packageId: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    distanceMeter: { type: DataTypes.STRING, allowNull: true },
  })
  return hospitalModel;
}
