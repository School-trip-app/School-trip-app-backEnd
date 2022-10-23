"use strict";

function createTripRequestTable(sequelize, DataTypes) {
  return (
    sequelize.define("tripRequest", {
      place: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.STRING, allowNull: false },
      numberOfStudents: { type: DataTypes.INTEGER, allowNull: false },
      contactMethod: { type: DataTypes.STRING, allowNull: false },
      otherDetails: { type: DataTypes.STRING },
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
  )
}
module.exports = { createTripRequestTable };