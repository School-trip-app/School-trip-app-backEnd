"use strict";

module.exports = (sequelize, DataTypes) => {

  const memoriesModel = sequelize.define("memories", {
    userId: { type: DataTypes.INTEGER, allowNull: true },
    image: {
      type: DataTypes.STRING,
      defaultValue: ''
  },
    discription: { type: DataTypes.TEXT, allowNull: true },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    dislikes: { type: DataTypes.INTEGER, defaultValue: 0 }
  })
  return memoriesModel;
}
