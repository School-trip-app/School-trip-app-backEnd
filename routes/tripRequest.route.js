'use strict';

const express = require('express');
const router = express.Router();
const { tripRequestModel } = require('../models');

router.post('/tripRequest', addTripRequest);
router.get('/tripRequest', getTripRequest);
router.put('/tripRequest/:id', updateTripRequest);
router.delete('/tripRequest/:id', deleteTripRequest);

function addTripRequest(req, res, next) {
  /*body :{"place":"string", "date":"string","numberOfStudents":"integer",
  "contactMethod":"string","otherDetails":"string"}*/
  try {
    tripRequestModel.create(req.body)
      .then(resolve => { res.status(201).send('done') })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside addTripRequest function : ${err}`);
  }
}

function getTripRequest(req, res, next) {
  try {
    tripRequestModel.findAll()
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log('no data') });
  } catch (err) {
    next(`Error inside getTripRequest function : ${err}`);
  }
}

function updateTripRequest(req, res, next) {
  try {
    tripRequestModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('updated') })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updateTripRequest function : ${err}`);
  }
}

function deleteTripRequest(req, res, next) {
  try {
    tripRequestModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send(`deleted`) })
      .catch((reject) => { console.log('Cant Delete') });
  } catch (err) {
    next(`Error inside deleteTripRequest function : ${err}`);
  }
}
module.exports = router;