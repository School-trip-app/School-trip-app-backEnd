'use strict';

const express = require('express');
const router = express.Router();
const { tripRequestModel, UserModel } = require('../models');

router.post('/tripRequest', addTripRequest);
router.get('/tripRequest', getTripRequest);
router.put('/tripRequest/:id', updateTripRequest);
router.delete('/tripRequest/:id', deleteTripRequest);

function addTripRequest(req, res, next) {
  /*body :{"place":"string", "date":"string","numberOfStudents":"integer",
  "contactMethod":"string","otherDetails":"string"}*/
  try {
    tripRequestModel.create(req.body)
      .then(resolve => { res.status(201).send(resolve) })
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
      .catch((reject) => { console.log(reject) });
  } catch (err) {
    next(`Error inside getTripRequest function : ${err}`);
  }
}

function updateTripRequest(req, res, next) {
  try {
    tripRequestModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { console.log(reject) });
  } catch (err) {
    next(`Error inside updateTripRequest function : ${err}`);
  }
}

function deleteTripRequest(req, res, next) {
  try {
    tripRequestModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send(resolve) })
      .catch((reject) => { console.log(reject) });
  } catch (err) {
    next(`Error inside deleteTripRequest function : ${err}`);
  }
}
async function getUserWithRequest(req, res) {
  try {
     const usersWithReuest=await UserModel.findAll({include:[tripRequestModel]});
     res.status(200).json(usersWithReuest);
  } catch (error) {
    console.log(error);
  }
}

router.get('/usersWithRequest', getUserWithRequest);
module.exports = router;