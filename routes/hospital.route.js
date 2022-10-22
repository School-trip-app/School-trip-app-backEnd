const express = require('express');
const router = express.Router();
const axios = require('axios');


const { hospitalModel, packageModel } = require('../models');

router.post('/hospital/:packageId', addHospital);
router.get('/hospital/:packageId', getHospital);


function addHospital(req, res, next) {


    packageModel.findAll({ where: { id: req.params.packageId } })
        .then((resolve) => {

            const lat = resolve[0].dataValues.locationLat;
            const lon = resolve[0].dataValues.locationLon;

            const options = {
                method: 'GET',
                url: 'https://nearby-places.p.rapidapi.com/v2/nearby',
                params: { lat: lat, lng: lon, type: 'Hospital', radius: '50000' },
                headers: {
                    'X-RapidAPI-Key': '029c4782f7mshe41e385265f01c8p1a27d5jsnfdc0dcbb31a8',
                    'X-RapidAPI-Host': 'nearby-places.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                response.data.results.map(item => {
                    const obj = {
                        packageId: req.params.packageId,
                        name: item.name,
                        address: item.address,
                        phone: item.phone,
                        distanceMeter: item.distanceMeter,
                    }
                    hospitalModel.create(obj)
                        .then(packageHospital => { })
                        .catch(reject => res.status(501).send(`cant create an image :${reject}`));
                })
                res.status(201).send('Successfully Created')
            })
        })

}


function getHospital(req, res, next) {

    const options = {
        method: 'GET',
        url: 'https://nearby-places.p.rapidapi.com/v2/nearby',
        params: { lat: '31.06889', lng: '35.63944', type: 'Hospital', radius: '50000' },
        headers: {
            'X-RapidAPI-Key': '658d9f8a13msh6c96f2c72936bbep19c408jsnd262b59a0bab',
            'X-RapidAPI-Host': 'nearby-places.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}

module.exports = router;