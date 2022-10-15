"use strict";

function createCommentTable(sequelize, DataTypes) {
  return (
    sequelize.define("comment", {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      memoryId: { type: DataTypes.INTEGER, allowNull: false },
      comment: { type: DataTypes.STRING, allowNull: false },
      commentDate : { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    })
  )
}
module.exports = { createCommentTable };
