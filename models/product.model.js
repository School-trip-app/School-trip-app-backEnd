"use strict";

module.exports=(sequelize, DataTypes)=>{

const productModel=sequelize.define("products", {
			name: { type: DataTypes.STRING, allowNull: true },
			image: { type: DataTypes.STRING, allowNull: true },
			price: { type: DataTypes.INTEGER, allowNull: true },
			discreption: { type: DataTypes.TEXT, allowNull: true },
			category: { type: DataTypes.ENUM("sea", "desert", "mountain"), allowNull: true },
		})
	return productModel;
}

