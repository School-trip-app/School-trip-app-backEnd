"use strict";

function createPackageDetailsTable(sequelize, DataTypes) {
  return (
    sequelize.define("packageDetails", {
      packageId: { type: DataTypes.INTEGER, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
    })
  )
}
module.exports = { createPackageDetailsTable };
