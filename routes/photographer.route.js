"use strict";

const router = require('express').Router();

const { addPhotographer,
    putRate,
    getAllPhotgraphers,
    deletephotographer
} = require('../controllers/photograhper');

router.put('/photographer/:id', putRate);
router.post('/photographer', addPhotographer);
router.get('/photographer', getAllPhotgraphers);
router.delete('/photographer/:id', deletephotographer);


module.exports = router;