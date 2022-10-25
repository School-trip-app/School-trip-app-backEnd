'use strict';

const router = require('express').Router();

const { addProduct,
  deleteProduct,
  updateProduct,
  getProduct } = require('../controllers/product')



router.post('/product', addProduct);
router.get('/product', getProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);



module.exports = router;