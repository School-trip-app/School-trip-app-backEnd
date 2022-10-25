"use strict";

module.exports = (sequelize, DataTypes) => {
  const commentModel = sequelize.define("comment", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    memoryId: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: false }
  })
  return commentModel;
}

