"use strict";

module.exports=(sequelize, DataTypes)=>{

const productModel=sequelize.define("product", {
			name: { type: DataTypes.STRING, allowNull: false },
			image: { type: DataTypes.STRING, allowNull: false },
			price: { type: DataTypes.INTEGER, allowNull: false },
			discreption: { type: DataTypes.TEXT, allowNull: false },
			category: { type: DataTypes.ENUM("sea", "desert", "mountain"), allowNull: false },
		})
	return productModel;
}

