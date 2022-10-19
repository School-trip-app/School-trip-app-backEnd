"use strict";
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const User = require('./user');
const { createCommentTable } = require("./comment.model");
const { createMemoriesTable } = require("./memories.model");
const { createPackageTable } = require("./package.model");
const { createPackageWeatherTable } = require("./packageWeather.model");
const { createPackageImagesTable } = require("./packageImages.model");
const { createTripRequestTable } = require("./tripRequest.model");
const { createTripsOrderTable } = require('./tripsOrders.model');
const photographers = require('./photographer.model');
const POSTGRES_URL = process.env.DATABASE_URL;

const sequelizeOption = {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
}

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);


const UserModel = User(sequelize, DataTypes);
const commentModel = createCommentTable(sequelize, DataTypes);
const memoriesModel = createMemoriesTable(sequelize, DataTypes);
const packageModel = createPackageTable(sequelize, DataTypes);
const packageWeatherModel = createPackageWeatherTable(sequelize, DataTypes);
const packageImagesModel = createPackageImagesTable(sequelize, DataTypes);
const tripRequestModel = createTripRequestTable(sequelize, DataTypes);
const tripsOrdersModel = createTripsOrderTable(sequelize, DataTypes);
const photographerModel = photographers(sequelize, DataTypes);


packageModel.hasOne(packageWeatherModel, { forignKey: 'packageId', primaryKey: 'id' });
packageWeatherModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

packageModel.hasMany(packageImagesModel, { forignKey: 'packageId', primaryKey: 'id' });
packageImagesModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

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
	photographerModel
}