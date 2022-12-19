"use strict";

const router = require('express').Router();

const { addPhotographer,
    putRate,
    getAllPhotgraphers,
    deletephotographer,
    getPhotgraphersid
} = require('../controllers/photograhper');

router.put('/photographer/:id', putRate);
router.post('/photographer', addPhotographer);
router.get('/photographer', getAllPhotgraphers);
router.get('/photographer/:id', getPhotgraphersid);

router.delete('/photographer/:id', deletephotographer);


module.exports = router;