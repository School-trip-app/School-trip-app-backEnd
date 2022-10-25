'use strict';

const router = require('express').Router();

const { deletePackageImages,
  updatePackageImages,
  getPackageImages,
  addPackageImages } = require('../controllers/packageImages');


router.post('/packageImages/:packageId', addPackageImages);
router.get('/packageImages/:packageId', getPackageImages);
router.put('/packageImages/:id', updatePackageImages);
router.delete('/packageImages/:id', deletePackageImages);


module.exports = router;