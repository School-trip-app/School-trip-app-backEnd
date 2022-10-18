"use strict";

function createPackageTable(sequelize, DataTypes) {
	return (
		sequelize.define("package", {
			packageName: { type: DataTypes.STRING, allowNull: false, unique: true },
			locationName: { type: DataTypes.STRING, allowNull: false },
			packageDiscription: { type: DataTypes.STRING, allowNull: false },
			rate: { type: DataTypes.INTEGER },
			ratesNumber: { type: DataTypes.INTEGER, defaultValue: 0 },
			tripDate: { type: DataTypes.DATEONLY, allowNull: false },
			numberOfPeople: { type: DataTypes.INTEGER, allowNull: false },
			startingTime: { type: DataTypes.STRING, allowNull: false },
			endingTime: { type: DataTypes.STRING, allowNull: false },
			price: { type: DataTypes.STRING, allowNull: false },
			locationUrl: { type: DataTypes.STRING, allowNull: false },
			meals: { type: DataTypes.STRING },
		})
	)
}
module.exports = { createPackageTable };