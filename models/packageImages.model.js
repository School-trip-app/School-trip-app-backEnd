"use strict";

function createPackageImagesTable(sequelize, DataTypes) {
  return (
    sequelize.define("packageImages", {
      packageId: { type: DataTypes.INTEGER, allowNull: false },
    })
  )
}
module.exports = { createPackageImagesTable };