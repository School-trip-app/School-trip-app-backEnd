"use strict";

function createProductTable(sequelize, DataTypes) {
	return (
		sequelize.define("product", {
			name: { type: DataTypes.STRING, allowNull: false },
			image: { type: DataTypes.STRING, allowNull: false },
			price: { type: DataTypes.INTEGER, allowNull: false },
			quantity: { type: DataTypes.STRING, allowNull: false },
			discreption: { type: DataTypes.STRING, allowNull: false },
			category: { type: DataTypes.ENUM("sea", "desert", "mountain"), allowNull: false },
		})
	);
}
module.exports = { createProductTable };