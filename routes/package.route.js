'use strict';

const { packageModel, packageWeatherModel, packageImagesModel, tripsOrdersModel, UserModel } = require('../models');
const express = require('express');
const router = express.Router();
const axios = require('axios');

//========================================================== Routes ==========================================================//

router.post('/package', addPackage);
router.get('/package', getPackages);
router.put('/package/:id', updatePackage);
router.delete('/package/:id', deletePackage);
router.put('/package/rate/:id', updateRate);

router.post('/package/order/:userId/:packageId', orderPackage);
router.get('/package/order', getOrders);
router.delete('/package/order/:id', deleteOrder);

//========================================================== Handlers ==========================================================//

async function addPackage(req, res, next) {
  try {
    let tripCityName = req.body.city;
    let weatherApiResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${tripCityName}&key=8840fcd16a3743e085ae62df20471696`);
    req.body.locationLat = weatherApiResponse.data.lat;
    req.body.locationLon = weatherApiResponse.data.lon;
    const weatherArray = weatherApiResponse.data.data;
    let tripDayWeather = weatherArray.find(item => item.valid_date == req.body.tripDate);
    packageModel.create(req.body)
      .then(createdPackage => {
        const weatherObj = {
          packageId: createdPackage.id,
          temp: tripDayWeather.temp,
          minTemp: tripDayWeather.min_temp,
          maxTemp: tripDayWeather.max_temp,
          windSpeed: tripDayWeather.wind_spd,
          description: tripDayWeather.weather.description,
        }
        packageWeatherModel.create(weatherObj)
          .then(packageWeather => { })
          .catch(reject => res.status(501).send(`cant create weather :${reject}`));
        axios.get(`https://api.unsplash.com//search/photos/?client_id=yDXvlsU43Gge_LLbViI2InRB72Jv4eAicowNiKOvi-Q&query=${tripCityName}`)
          .then(unsplash => {
            const imagesArray = unsplash.data.results;
            imagesArray.map(item => {
              const obj = {
                packageId: createdPackage.id,
                imageUrl: item.urls.full,
              }
              packageImagesModel.create(obj)
                .then(packageImage => { })
                .catch(reject => res.status(501).send(`cant create an image :${reject}`));
            })
            res.status(201).send('Successfully Created')
          })
          .catch(err => console.log(err));
      })
      .catch(reject => { res.status(501).send(`cant create a package :${reject}`) });
  } catch (err) {
    next(`Error inside addPackage function : ${err}`);
  }
}

function getPackages(req, res, next) {
  try {
    packageModel.findAll({ include: [packageImagesModel, packageWeatherModel] })
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
    let packagex = await packageModel.findOne({ where: { id: req.params.id } });
    packageModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => {
        let bodyKeys = Object.keys(req.body);
        if (bodyKeys.includes("tripDate")) {
          axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${packagex.city}&key=8840fcd16a3743e085ae62df20471696`)
            .then(weatherData => {
              const weatherArray = weatherData.data.data;
              let tripDayWeather = weatherArray.find(item => item.valid_date == req.body.tripDate);
              const weatherObj = {
                temp: tripDayWeather.temp,
                minTemp: tripDayWeather.min_temp,
                maxTemp: tripDayWeather.max_temp,
                windSpeed: tripDayWeather.wind_spd,
                description: tripDayWeather.weather.description,
              }
              packageWeatherModel.update(weatherObj, { where: { packageId: packagex.id } })
                .then(packageWeather => { res.status(200).send('updated with weather') })
                .catch(reject => res.status(501).send(`cant create weather :${reject}`));
            })
            .catch(reject => res.status(501).send(`error inside update weather:${reject}`));
        } else {
          res.status(200).send('updated')
        }
      })
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
    const packagee = await packageModel.findOne({ where: { id: req.params.id } });

    // make avarige of the rate and update the package by math logic
    const newretaPoints = (packagee.ratePoints + req.body.ratePoints);
    const newratePeople = (packagee.ratePeople + 1);
    const newRate = (newretaPoints / newratePeople);

    packageModel.update({ rate: `${newRate}`, ratePeople: newratePeople, ratePoints: newretaPoints }, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('rate updated') })
      .catch(reject => { console.log(`${reject}`) });
  } catch (err) {
    next(`Error inside updateRate function : ${err}`);
  }
}

async function orderPackage(req, res, next) {
  try {
    const Order = {
      userId: req.params.userId,
      packageId: req.params.packageId,
      notes: req.body.notes,
    }
    tripsOrdersModel.create(Order)
      .then(resolve => { res.status(201).send(`Order sent`) })
      .catch(reject => { res.status(403).send(`Cannot update : ${reject}`) });
  } catch (err) {
    next(`Error inside orderPackage function : ${err}`);
  }
}

async function getOrders(req, res, next) {
  try {
    tripsOrdersModel.findAll({ include: [packageModel, UserModel] })
      .then(resolve => { res.status(201).send(resolve) })
      .catch(reject => { res.status(403).send(`Cannot update : ${reject}`) });
  } catch (err) {
    next(`Error inside orderPackage function : ${err}`);
  }
}

async function deleteOrder(req, res, next) {
  try {
    tripsOrdersModel.destroy({ where: { id: req.params.id } })
      .then(resolve => { res.status(201).send(resolve) })
      .catch(reject => { res.status(403).send(`Cannot update : ${reject}`) });
  } catch (err) {
    next(`Error inside orderPackage function : ${err}`);
  }
}







module.exports = router;