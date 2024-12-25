"use strict";

module.exports = (sequelize, DataTypes) => {
    
    const commentsModel = sequelize.define("comments", {
        userId: { type: DataTypes.INTEGER, allowNull: false },
        memoryId: { type: DataTypes.INTEGER, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false }
    })
    return commentsModel;
}