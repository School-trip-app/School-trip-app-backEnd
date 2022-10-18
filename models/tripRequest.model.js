"use strict";

function createTripRequestTable(sequelize, DataTypes) {
  return (
    sequelize.define("tripRequest", {
      place: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.STRING, allowNull: false },
      numberOfStudents: { type: DataTypes.INTEGER, allowNull: false },
      contactMethod: { type: DataTypes.STRING, allowNull: false },
      otherDetails: { type: DataTypes.STRING }
    })
  )
}
module.exports = { createTripRequestTable };