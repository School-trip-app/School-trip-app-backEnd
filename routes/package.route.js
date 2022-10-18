'use strict';
const express = require('express');
const router = express.Router();
const { packageModel, packageWeatherModel, packageImagesModel } = require('../models');
const axios = require('axios');

router.post('/package', addPackage);
router.get('/package', getPackages);
router.put('/package/:id', updatePackage);
router.delete('/package/:id', deletePackage);
router.put('/package/rate/:id', updateRate);
// router.post('/package/order', orderPackage);







async function addPackage(req, res, next) {
  // request body = {
  //     "packageName": "unique Package name",
  //     "locationName": "jordanian city",
  //     "packageDiscription": "add here the discription about the trip",
  //     "tripDate": "2022-10-18",
  //     "numberOfPeople":20 ,
  //     "startingTime":"10:00 am" ,
  //     "endingTime": "07:00 pm",
  //     "price": "15JD/person",
  //     "meals":"breakfast and lunch",
  // }
  try {
    let location = req.body.locationName;
    let weatherApiResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city={${location}}&key=8840fcd16a3743e085ae62df20471696`);
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
        axios.get(`https://api.unsplash.com//search/photos/?client_id=yDXvlsU43Gge_LLbViI2InRB72Jv4eAicowNiKOvi-Q&query=${location}`)
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
    packageModel.findAll({ include: [packageImagesModel] })
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log('no data') });
  } catch (err) {
    next(`Error inside getPackages function : ${err}`);
  }
}

function updatePackage(req, res, next) {
  try {
    packageModel.update(req.body, { where: { id: req.params.id } })
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