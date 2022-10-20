"use strict";

function createPackageTable(sequelize, DataTypes) {
	return (
		sequelize.define("package", {
			packageName: { type: DataTypes.STRING, allowNull: false, unique: true },
			locationName: { type: DataTypes.STRING, allowNull: false },
			locationLat: { type: DataTypes.STRING, allowNull: false },
			locationLon: { type: DataTypes.STRING, allowNull: false },
			packageDiscription: { type: DataTypes.STRING, allowNull: false },
			rate: { type: DataTypes.STRING },
			ratePoints: { type: DataTypes.INTEGER, defaultValue: 0 },
			ratesNumber: { type: DataTypes.INTEGER, defaultValue: 0 },
			tripDate: { type: DataTypes.STRING, allowNull: false },
			numberOfPeople: { type: DataTypes.INTEGER, allowNull: false },
			startingTime: { type: DataTypes.STRING, allowNull: false },
			endingTime: { type: DataTypes.STRING, allowNull: false },
			price: { type: DataTypes.STRING, allowNull: false },
			meals: { type: DataTypes.STRING },
		})
	);
}
module.exports = { createPackageTable };