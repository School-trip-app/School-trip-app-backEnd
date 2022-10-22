"use strict";

function createPhotographer(sequleize, DataTypes) {
    return (
        sequleize.define('photographer', {
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
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        })
    );
}

module.exports = { createPhotographer };