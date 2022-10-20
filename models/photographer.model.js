"use strict";


const photographers = (sequleize, DataTypes) => {
    const photographer = sequleize.define('phtographerTable', {

        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rate: {
            type: DataTypes.FLOAT,
            allowNull: null
        },
        numberOfRating: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        totalRate: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    });
    return photographer;
}

module.exports = photographers;