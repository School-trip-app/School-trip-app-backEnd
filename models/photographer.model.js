"use strict";

module.exports = (sequleize, DataTypes) => {

    const photographerModel = sequleize.define('photographer', {
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rate: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        numberOfRating: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        totalRate: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    return photographerModel;
}

