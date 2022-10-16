"use strict";

function createMemoriesTable(sequelize, DataTypes) {
  return (
    sequelize.define("memories", {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      discription: { type: DataTypes.STRING, allowNull: false },
      likes: { type: DataTypes.INTEGER , defaultValue : 0 },
      dislikes: { type: DataTypes.INTEGER , defaultValue : 0}
    })
  )
}
module.exports = { createMemoriesTable };