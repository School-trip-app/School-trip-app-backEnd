'use strict';
const express = require('express');
const router = express.Router();

const { packageModel, packageDetailsModel, packageImagesModel } = require('../models');

router.post('/package', addPackage);
router.get('/package', getPackages);
router.put('/package/:id', updatePackage);
router.delete('/package/:id', deletePackage);
router.put('/package/rate/:id', updateRate);







function addPackage(req, res, next) {
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