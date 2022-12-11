"use strict";

module.exports = (sequelize, DataTypes) => {
  const tripRequestModel = sequelize.define("tripRequest", {
    place: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    numberOfStudents: { type: DataTypes.INTEGER, allowNull: false },
    contactMethod: { type: DataTypes.STRING, allowNull: false },
    otherDetails: { type: DataTypes.STRING },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  return tripRequestModel;

}
