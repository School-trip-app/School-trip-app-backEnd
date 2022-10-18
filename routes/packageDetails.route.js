'use strict';

const express = require('express');
const router = express.Router();
const { packageDetailsModel, packageModel } = require('../models');

router.post('/packageDetails/:packageId', addPackageDetails);
router.get('/packageDetails/:packageId', getPackageDetails);
router.put('/packageDetails/:id', updatePackageDetails);
router.delete('/packageDetails/:id', deletePackageDetails);

function addPackageDetails(req, res, next) {
  /*
  {"packageId":"INTEGER","locationURL":"STRING","tripDate":"DATEONLY","numberOfPeople":"INTEGER",
  "startingTime":"STRING","endingTime":"STRING","price":"INTEGER","meals":"STRING"}
  */
  try {
    const packageDetailsData = {
      packageId: req.params.packageId,
      locationURL: req.body.locationURL,
      numberOfPeople: req.body.numberOfPeople,
      startingTime: req.body.startingTime,
      endingTime: req.body.endingTime,
      price: req.body.price,
      meals: req.body.meals,
    }
    packageDetailsModel.create(packageDetailsData)
      .then(resolve => { res.status(201).send('done') })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside addPackageDetails function : ${err}`);
  }
}

function getPackageDetails(req, res, next) {
  try {
    packageDetailsModel.findAll({ where: { packageId: req.params.packageId } , include: [packageModel] })
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log('no data') });
  } catch (err) {
    next(`Error inside getPackageDetails function : ${err}`);
  }
}

function updatePackageDetails(req, res, next) {
  try {
    packageDetailsModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('updated') })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updatePackageDetails function : ${err}`);
  }
}

function deletePackageDetails(req, res, next) {
  try {
    packageDetailsModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send(`deleted`) })
      .catch((reject) => { console.log('Cant Delete') });
  } catch (err) {
    next(`Error inside deletePackageDetails function : ${err}`);
  }
}
module.exports = router;