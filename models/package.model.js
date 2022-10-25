"use strict";

module.exports = (sequelize, DataTypes) => {

	const packageModel = sequelize.define("package", {
		packageName: { type: DataTypes.STRING, allowNull: false, unique: true },
		city: { type: DataTypes.STRING, allowNull: false },
		locationName: { type: DataTypes.STRING, allowNull: false },
		locationLat: { type: DataTypes.STRING, allowNull: false },
		locationLon: { type: DataTypes.STRING, allowNull: false },
		packageDiscription: { type: DataTypes.TEXT, allowNull: false },
		rate: { type: DataTypes.FLOAT, allowNull: false },
		ratePoints: { type: DataTypes.FLOAT, defaultValue: 0 },
		ratesNumber: { type: DataTypes.INTEGER, defaultValue: 1 },
		tripDate: { type: DataTypes.STRING, allowNull: false },
		numberOfPeople: { type: DataTypes.INTEGER, allowNull: false },
		startingTime: { type: DataTypes.STRING, allowNull: false },
		endingTime: { type: DataTypes.STRING, allowNull: false },
		price: { type: DataTypes.INTEGER, allowNull: false },
		meals: { type: DataTypes.STRING },
		pickUpPoint: { type: DataTypes.STRING, allowNull: false },
		dropPoint: { type: DataTypes.STRING, allowNull: false },
	});
	return packageModel;
}
