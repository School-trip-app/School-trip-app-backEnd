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


let sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	protocol: 'postgres',
	dialectOptions: {
		ssl: true,
		native: true
	}
});


const UserModel = require('./user')(sequelize, DataTypes);
const memoriesModel = require("./memories.model")(sequelize, DataTypes);
const packageModel = require("./package.model")(sequelize, DataTypes);
const packageWeatherModel = require("./packageWeather.model")(sequelize, DataTypes);
const packageImagesModel = require("./packageImages.model")(sequelize, DataTypes);
const tripRequestModel = require("./tripRequest.model")(sequelize, DataTypes);
const tripsOrdersModel = require('./tripsOrders.model')(sequelize, DataTypes);
const hospitalModel = require('./hospital.model')(sequelize, DataTypes);
const productModel = require('./product.model')(sequelize, DataTypes);
const photographerModel = require('./photographer.model')(sequelize, DataTypes);
const paymentDetialsModel = require('./paymentDetails.model')(sequelize, DataTypes);
const commentModel = require('./comments.model')(sequelize, DataTypes);
const Reaction = require('./likes.model')(sequelize, DataTypes);

packageModel.hasOne(packageWeatherModel, { forignKey: 'packageId', primaryKey: 'id' });
packageWeatherModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

packageModel.hasMany(packageImagesModel, { forignKey: 'packageId', primaryKey: 'id' });
packageImagesModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

packageModel.hasMany(hospitalModel, { forignKey: 'packageId', primaryKey: 'id' });
hospitalModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

UserModel.hasMany(memoriesModel, { forignKey: 'userId', primaryKey: 'id' });
memoriesModel.belongsTo(UserModel, { forignKey: 'userId', targetKey: 'id' });

UserModel.hasMany(tripsOrdersModel, { forignKey: 'userId', primaryKey: 'id' });
tripsOrdersModel.belongsTo(UserModel, { forignKey: 'userId', targetKey: 'id' });

packageModel.hasMany(tripsOrdersModel, { forignKey: 'packageId', primaryKey: 'id' });
tripsOrdersModel.belongsTo(packageModel, { forignKey: 'packageId', targetKey: 'id' });

photographerModel.hasOne(tripsOrdersModel, { forignKey: 'photographerId', primaryKey: 'id' });
tripsOrdersModel.belongsTo(photographerModel, { forignKey: 'photographerId', targetKey: 'id' });

UserModel.hasMany(tripRequestModel, { forignKey: 'userId', sourceId: 'id' });
tripRequestModel.belongsTo(UserModel, { forignKey: 'userId', targetKey: 'id' });

UserModel.hasMany(commentModel, { forignKey: 'userId', sourceId: 'id' });
commentModel.belongsTo(UserModel, { forignKey: 'userId', targetKey: 'id' });

memoriesModel.hasMany(commentModel, { forignKey: 'userId', sourceId: 'id' });
commentModel.belongsTo(memoriesModel, { forignKey: 'userId', targetKey: 'id' });

UserModel.hasMany(Reaction, { foreignKey: 'userId', sourceKey: 'id' });
Reaction.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'id' });


memoriesModel.hasMany(Reaction, { foreignKey: 'memoryId', sourceKey: 'id' });
Reaction.belongsTo(memoriesModel, { foreignKey: 'memoryId', targetKey: 'id' });

// UserModel.hasMany(likesModel, { foreignKey: 'userId', sourceKey: 'id' });
// likesModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'id' });

// Alias 'memoryLikes' to differentiate likes on Memories
// memoriesModel.hasMany(likesModel, { foreignKey: 'memoryId', sourceKey: 'id',  });
// likesModel.belongsTo(memoriesModel, { foreignKey: 'memoryId', targetKey: 'id' });

// Fix typo in 'foreignKey' and use 'as' to avoid collision

// UserModel.hasMany(likesModel, { foreignKey: 'userId', sourceKey: 'id',  });
// likesModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'id',  });

// memoriesModel.hasMany(likesModel, { foreignKey: 'memoryId', sourceKey: 'id',  });
// likesModel.belongsTo(memoriesModel, { foreignKey: 'memoryId', targetKey: 'id' });



sequelize.authenticate()
	.then(() => {
		console.log('Database connected to postgres>>>>>>>>>>>>>>>>>>');
	}).catch((err) => {
		console.log('Unable to connect to the database:>>>>>>>>>>>>>', err);
	});


module.exports = {
	db: sequelize,
	UserModel,
	memoriesModel,
	packageModel,
	packageWeatherModel,
	packageImagesModel,
	tripRequestModel,
	tripsOrdersModel,
	productModel,
	photographerModel,
	hospitalModel,
	paymentDetialsModel,
	commentModel,
	Reaction
}