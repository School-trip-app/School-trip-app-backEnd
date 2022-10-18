'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');

const bodyParser = require('body-parser');
router.use(express.json());

router.use(bodyParser.urlencoded({ extended: true }));

const { packageModel, packageDetailsModel, packageImagesModel } = require('../models');

router.post('/package', addPackage);
router.get('/package', getPackages);
router.put('/package/:id', updatePackage);
router.delete('/package/:id', deletePackage);
router.put('/package/rate/:id', updateRate);







async function addPackage(req, res, next) {
  /* 
  body :{
    "packageName":"",
    "locationName":"",
    "packageDiscription":"",
    "date":"DD/MM/YYYY",
    "weatherURL":""
  }
  */
  try {


    const response = await axios({
      url: `https://api.weatherbit.io/v2.0/forecast/daily?city=${req.body.locationName}&key=8840fcd16a3743e085ae62df20471696`,
      method: 'get',
    });

    response.data.data.map((item) => {
      if (item.valid_date === req.body.date) {
        req.body.weather = JSON.stringify({
          description: item.weather.description,
          high_temp: item.high_temp,
          low_temp: item.low_temp,
          wind_cdir_full: item.wind_cdir_full,
          wind_spd: item.wind_spd,

        });
      }

    });


    packageModel.create(req.body)
      .then(resolve => { res.status(201).send('done') })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside addPackage function : ${err}`);
  }
}

function getPackages(req, res, next) {
  try {
    packageModel.findAll({ include: [packageDetailsModel, packageImagesModel] })
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log('no data') });
  } catch (err) {
    next(`Error inside getPackages function : ${err}`);
  }
}

async function updatePackage(req, res, next) {
  try {

    const response = await axios({
      url: `https://api.weatherbit.io/v2.0/forecast/daily?city=${req.body.locationName}&key=8840fcd16a3743e085ae62df20471696`,
      method: 'get',
    });

    response.data.data.map((item) => {
      if (item.valid_date === req.body.date) {
        req.body.weather = JSON.stringify({
          description: item.weather.description,
          high_temp: item.high_temp,
          low_temp: item.low_temp,
          wind_cdir_full: item.wind_cdir_full,
          wind_spd: item.wind_spd,

        });
      }

    });

 

    packageModel.update(req.body , { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('updated') })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updatePackage function : ${err}`);
  }
}

function deletePackage(req, res, next) {
  try {
    packageModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send(`deleted`) })
      .catch((reject) => { console.log('Cant Delete') });
  } catch (err) {
    next(`Error inside deletePackage function : ${err}`);
  }
}

async function updateRate(req, res, next) {
  try {
    const packagee = await packageModel.findOne({ where: { id: req.params.id } })
    const userRate = req.body.rate;
    const ratesNumber = packagee.ratesNumber + 1;
    let newRate = (packagee.rate + userRate) / `${ratesNumber}`;
    packageModel.update({ rate: `${newRate}`, ratesNumber: ratesNumber }, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('rate updated') })
      .catch(reject => { console.log(`${reject}`) });
  } catch (err) {
    next(`Error inside updateRate function : ${err}`);
  }
}

module.exports = router;