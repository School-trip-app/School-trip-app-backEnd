'use strict';

const router = require('express').Router();

const { deletePackageDetails,
  updatePackageDetails,
  getPackageDetails,
  addPackageDetails } = require('../controllers/packageDetails');

  
router.post('/packageDetails/:packageId', addPackageDetails);
router.get('/packageDetails/:packageId', getPackageDetails);
router.put('/packageDetails/:id', updatePackageDetails);
router.delete('/packageDetails/:id', deletePackageDetails);


module.exports = router;