"use strict";

const router = require('express').Router();

const { addPhotographer,
    putRate,
    getAllPhotgraphers } = require('../controllers/photograhper');
    
router.put('/photographer/:id', putRate);
router.post('/photographer', addPhotographer);
router.get('/photographer', getAllPhotgraphers);


module.exports = router;