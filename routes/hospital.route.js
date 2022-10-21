const express = require('express');
const router = express.Router();


const { hospitalModel, packageModel } = require('../models');

router.post('/hospital', addHospital);
router.get('/hospital', getHospital);
router.put('/hospital/:id', updateHospital);
router.delete('/hospital/:id', deleteHospital);

function addHospital(req, res, next) {
    //{"name":"STRING","address":"STRING","phone":"STRING","email":"STRING","website":"STRING"}
    try {
        const hospitalData = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website
        }
        hospitalModel.create(hospitalData)
        .then(resolve => { res.status(201).send('done') })
        .catch(reject => { res.status(306).send(reject) });
    } catch (err) {
        next(`Error inside addHospital function : ${err}`);
    }
    }