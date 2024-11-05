"use strict";

module.exports = (sequelize, DataTypes) => {

	const packageModel = sequelize.define("package", {
		packageName: { type: DataTypes.STRING, allowNull: true},
		city: { type: DataTypes.STRING, allowNull: true },
		locationName: { type: DataTypes.STRING, allowNull: true },
		locationLat: { type: DataTypes.STRING, allowNull: true },
		locationLon: { type: DataTypes.STRING, allowNull: true },
		packageDiscription: { type: DataTypes.TEXT, allowNull: true },
		rate: { type: DataTypes.FLOAT, allowNull: true },
		ratePoints: { type: DataTypes.FLOAT, defaultValue: 0 },
		ratesNumber: { type: DataTypes.INTEGER, defaultValue: 1 },
		tripDate: { type: DataTypes.STRING, allowNull: true },
		numberOfPeople: { type: DataTypes.INTEGER, allowNull: true },
		startingTime: { type: DataTypes.STRING, allowNull: true },
		endingTime: { type: DataTypes.STRING, allowNull: true },
		price: { type: DataTypes.INTEGER, allowNull: true },
		meals: { type: DataTypes.STRING },
		pickUpPoint: { type: DataTypes.STRING, allowNull: true },
		dropPoint: { type: DataTypes.STRING, allowNull: true },
		numbersOfBook:{type:DataTypes.INTEGER, allowNullL:true , defaultValue: 0}
		
	});
	return packageModel;
}
