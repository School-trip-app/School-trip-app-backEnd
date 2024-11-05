"use strict";

module.exports = (sequelize, DataTypes) => {
  const tripRequestModel = sequelize.define("tripRequest", {
    place: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.STRING, allowNull: true },
    numberOfStudents: { type: DataTypes.INTEGER, allowNull: true },
    contactMethod: { type: DataTypes.STRING, allowNull: true },
    otherDetails: { type: DataTypes.STRING },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })
  return tripRequestModel;

}
