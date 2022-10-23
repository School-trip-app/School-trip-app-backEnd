"use strict";

module.exports = (sequelize, DataTypes) => {
  const packageImagesModel =
    sequelize.define("packageImages", {
      packageId: { type: DataTypes.INTEGER, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
    })
  return packageImagesModel;
}
