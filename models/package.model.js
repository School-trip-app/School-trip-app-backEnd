"use strict";

function createPackageTable(sequelize, DataTypes) {
	return (
		sequelize.define("package", {
			packageName: { type: DataTypes.STRING, allowNull: false, unique: true },
			locationName: { type: DataTypes.STRING, allowNull: false },
			packageDiscription: { type: DataTypes.STRING, allowNull: false },
			rate: { type: DataTypes.STRING },
			ratesNumber: { type: DataTypes.INTEGER, defaultValue: 0 },
			weatherURL: { type: DataTypes.STRING, allowNull: false }
		})
	)
}
module.exports = { createPackageTable };