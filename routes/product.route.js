'use strict';

const router = require('express').Router();

const { addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProductById
} = require('../controllers/product')



router.post('/product', addProduct);
router.get('/product', getProduct);
router.get('/product/:id', getProductById);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);



module.exports = router;