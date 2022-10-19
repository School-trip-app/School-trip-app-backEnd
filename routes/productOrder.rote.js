'use strict';

const express = require('express');
const router = express.Router();
const { productModel, productOrderModel, UserModel } = require('../models');

router.post('/productOrder/:productId/:userId', addProductOrder);
router.get('/productOrder', getProductOrder);
router.put('/productOrder/:id', updateProductOrder);
router.delete('/productOrder/:id', deleteProductOrder);

async function addProductOrder(req, res, next) {
  /*{"userId":"INTEGER","productId":"INTEGER","orderQuentity":"INTEGER","deliveryDate":"STRING" ,"contactInfo":"STRING","deliveryLocation":"STRING"}*/
  try {
    const productOrder = {
      userId: req.params.userId,
      productId: req.params.productId,
      orderQuentity: req.body.orderQuentity,
      deliveryDate: req.body.deliveryDate,
      contactInfo: req.body.contactInfo,
      deliveryLocation: req.body.deliveryLocation
    }
    await productOrderModel.create(productOrder)
      .then(resolve => { res.status(201).send(resolve) })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside productOrderModel function : ${err}`);
  }
}

async function getProductOrder(req, res, next) {
  try {
    await productOrderModel.findAll({ include: [productModel, UserModel] })
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside getProductOrder function : ${err}`);
  }
}

async function updateProductOrder(req, res, next) {
  try {
    await productOrderModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside updateProductOrder function : ${err}`)
  }
}

async function deleteProductOrder(req, res, next) {
  try {
    await productOrderModel.destroy({ where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('deleted') })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside productOrderModel function : ${err}`)
  }
}

module.exports = router;