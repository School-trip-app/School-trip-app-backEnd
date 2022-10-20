"use strict";
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const User = require('./user');

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

sequelize.authenticate().then(() => {
    console.log('Database connected to postgres');
}).catch((err) => {
    console.log(err);
});


module.exports = {
    db: sequelize,
    UserModel: UserModel
}