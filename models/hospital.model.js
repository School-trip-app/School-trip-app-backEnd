"use strict";

function createHospitalTable(sequelize, DataTypes) {
    return (
        sequelize.define("Hospital", {
            packageId: { type: DataTypes.INTEGER, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false },
            address: { type: DataTypes.STRING, allowNull: false },
            phone: { type: DataTypes.STRING, allowNull: false },
            distanceMeter: { type: DataTypes.STRING, allowNull: false },
        })
    )
}
module.exports = { createHospitalTable };
