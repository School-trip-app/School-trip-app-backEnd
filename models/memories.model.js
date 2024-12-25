"use strict";

module.exports = (sequelize, DataTypes) => {

  const memoriesModel = sequelize.define("memories", {
    userId: { type: DataTypes.INTEGER, allowNull: true },
    image: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    title: { type: DataTypes.STRING, allowNull: true },
    discription: { type: DataTypes.TEXT, allowNull: true },
  })

  
  return memoriesModel;
}
