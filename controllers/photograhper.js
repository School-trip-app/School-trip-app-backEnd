"use strict";

const { photographerModel } = require('../models/index');

const addPhotographer = async (req, res) => {
    const info = req.body;
    try {
        const newPhotographer = {
            image: info.image,
            name: info.name,
            email: info.email,
            phoneNumber: info.phoneNumber,
            rate: info.rate,
            totalRate: info.rate,
            price: info.price,
        }
        const photographer = await photographerModel.create(newPhotographer);
        res.status(200).send(photographer);

    } catch (error) {
        console.log(error);
    }

}

const getAllPhotgraphers = async (req, res) => {
    try {
        const allUser = await photographerModel.findAll();

        res.status(200).send(allUser);
    } catch (error) {
        console.log(error);
    }
}

const putRate = async (req, res) => {
    try {
        const id = req.params.id;
        const rateInput = req.body.rateInput;
        const photographer = await photographerModel.findOne({ where: { id } });
        photographer.update({
            numberOfRating: photographer.numberOfRating + 1
        });
        photographer.update({
            totalRate: photographer.totalRate + rateInput,
        })
        photographer.update({
            rate: photographer.totalRate / photographer.numberOfRating,
        });
        res.status(200).send(photographer);
    }
    catch (error) {
        console.log(error);
    }
}







module.exports = {
    addPhotographer,
    putRate,
    getAllPhotgraphers
}