'use strict';

const router = require('express').Router();

const { addnewPay, getAllPay } = require('../controllers/paymentDetails');
// const { upload } = require('../controllers/user');

router.post('/details', addnewPay);
router.get('/details', getAllPay);



module.exports = router;
