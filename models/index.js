"use strict";
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const sequelizeOption = {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
}
const POSTGRES_URL = process.env.DATABASE_URL;

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

const UserModel = require('./user')(sequelize, DataTypes);
const commentModel = require("./comment.model")(sequelize, DataTypes);
const memoriesModel = require("./memories.model")(sequelize, DataTypes);
const packageModel = require("./package.model")(sequelize, DataTypes);
const packageWeatherModel = require("./packageWeather.model")(sequelize, DataTypes);
const packageImagesModel = require("./packageImages.model")(sequelize, DataTypes);
const tripRequestModel = require("./tripRequest.model")(sequelize, DataTypes);
const tripsOrdersModel = require('./tripsOrders.model')(sequelize, DataTypes);
const hospitalModel = require('./hospital.model')(sequelize, DataTypes);
const productModel = require('./product.model')(sequelize, DataTypes);
const photographerModel = require('./photographer.model')(sequelize, DataTypes);
const paymentDetialsModel= require('./paymentDetails.model')(sequelize, DataTypes);



packageModel.hasOne(packageWeatherModel, { forignKey: 'packageId', primaryKey: 'id' });
packageWeatherModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

packageModel.hasMany(packageImagesModel, { forignKey: 'packageId', primaryKey: 'id' });
packageImagesModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

packageModel.hasMany(hospitalModel, { forignKey: 'packageId', primaryKey: 'id' });
hospitalModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

UserModel.hasMany(memoriesModel, { forignKey: 'userId', primaryKey: 'id' });
memoriesModel.belongsTo(UserModel, { forignKey: 'userId', targetKey: 'id' });

UserModel.hasMany(commentModel, { forignKey: 'userId', primaryKey: 'id' });
commentModel.belongsTo(UserModel, { forignKey: 'userId', targetKey: 'id' });

memoriesModel.hasMany(commentModel, { forignKey: 'memoryId', primaryKey: 'id' });
commentModel.belongsTo(memoriesModel, { forignKey: 'memoryId', targetKey: 'id' });

UserModel.hasMany(tripsOrdersModel, { forignKey: 'userId', primaryKey: 'id' });
tripsOrdersModel.belongsTo(UserModel, { forignKey: 'userId', targetKey: 'id' });

packageModel.hasMany(tripsOrdersModel, { forignKey: 'packageId', primaryKey: 'id' });
tripsOrdersModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

photographerModel.hasOne(tripsOrdersModel, { forignKey: 'photographerId', primaryKey: 'id' });
tripsOrdersModel.belongsTo(photographerModel, { forignKey: 'photographerId', targetKey: 'id' });

UserModel.hasMany(tripRequestModel,{forignKey:'userId',sourceId:'id'});
tripRequestModel.belongsTo(UserModel,{forignKey:'userId', targetKey:'id'});



sequelize.authenticate()
	.then(() => {
		console.log('Database connected to postgres');
	}).catch((err) => {
		console.log(err);
	});


module.exports = {
	db: sequelize,
	UserModel,
	commentModel,
	memoriesModel,
	packageModel,
	packageWeatherModel,
	packageImagesModel,
	tripRequestModel,
	tripsOrdersModel,
	productModel,
	photographerModel,
	hospitalModel,
	paymentDetialsModel
}