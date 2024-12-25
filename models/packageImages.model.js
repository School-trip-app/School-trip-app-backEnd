"use strict";

module.exports = (sequelize, DataTypes) => {
  const packageImagesModel =
    sequelize.define("packageImages", {
      packageId: { type: DataTypes.INTEGER, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
    })
  return packageImagesModel;
}
