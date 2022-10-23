"use strict";

module.exports = (sequelize, DataTypes) => {

  const hospitalModel = sequelize.define("Hospital", {
    packageId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    distanceMeter: { type: DataTypes.STRING, allowNull: false },
  })
  return hospitalModel;
}
