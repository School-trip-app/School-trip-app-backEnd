'use strict';


const { productModel, UserModel} = require('../models');

async function addProduct(req, res, next) {
  /*{"name":"STRING", "image":"STRING","price":"STRING","quantity":"STRING","discreption":"STRING","category":"sea"}*/
  try {
    await  productModel.create(req.body)
      .then(resolve => { res.status(201).send(resolve) })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside addProduct function : ${err}`);
  }
}

async function getProduct(req, res, next) {
  try {
    await productModel.findAll()
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside getProduct function : ${err}`);
  }
}

async function updateProduct (req, res, next) {
  try{
    await productModel.update(req.body,{where: {id : req.params.id}})
    .then(resolve => { res.status(200).send(resolve) })
    .catch(reject => { res.status(306).send(reject) });
  } catch(err){
    next(`Error inside updateProduct function : ${err}`)
  }
}

function deleteProduct (req, res, next) {
  try{
    productModel.destroy({where: {id : req.params.id}})
    .then(resolve => { res.status(200).send('deleted') })
    .catch(reject => { res.status(306).send(reject) });
  } catch(err){
    next(`Error inside deleteProduct function : ${err}`)
  }
}



module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    getProduct
}