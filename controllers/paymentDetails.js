"use strict";

const { paymentDetialsModel } = require('../models')


/* istanbul ignore next */
async function addnewPay(req,res){
    try {
        const pay = await paymentDetialsModel.create(req.body);
        res.status(200).json(pay);
    } catch (error) {
        console.log(error);
    }
}
/* istanbul ignore next */

async function getAllPay(req,res){
    try {
        const getAll = await paymentDetialsModel.findAll();
        res.status(200).json(getAll);
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getAllPay,
    addnewPay
}