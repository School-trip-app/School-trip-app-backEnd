"use strict";

function createPackageTable(sequelize, DataTypes) {
	return (
		sequelize.define("package", {
			packageName: { type: DataTypes.STRING, allowNull: false, unique: true },
			locationName: { type: DataTypes.STRING, allowNull: false },
			packageDiscription: { type: DataTypes.STRING, allowNull: false },
			rate: { type: DataTypes.INTEGER },
			weatherURL: { type: DataTypes.STRING, allowNull: false },
			date: { type: DataTypes.DATEONLY, allowNull: false },
			publishedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
		})
	)
}
module.exports = { createPackageTable };