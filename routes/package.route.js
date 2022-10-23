'use strict';

const router = require('express').Router();
const { selectOrder,
  deleteOrder,
  getOrders,
  orderPackage,
  updateRate,
  deletePackage,
  updatePackage,
  getPackages,
  addPackage } = require('../controllers/package');


router.post('/package', addPackage);
router.get('/package', getPackages);
router.put('/package/:id', updatePackage);
router.delete('/package/:id', deletePackage);
router.put('/package/rate/:id', updateRate);

router.post('/package/order/:userId/:packageId/:photographerId', orderPackage);
router.get('/package/order', getOrders);
router.get('/package/order/:id', selectOrder);

router.delete('/package/order/:id', deleteOrder);


module.exports = router;