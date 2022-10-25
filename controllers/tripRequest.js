'use strict';

const { tripRequestModel, UserModel } = require('../models');

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
      .then(resolve => { res.status(200).send('updated') })
      .catch(reject => { console.log(reject) });
  } catch (err) {
    next(`Error inside updateTripRequest function : ${err}`);
  }
}

function deleteTripRequest(req, res, next) {
  try {
    tripRequestModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send('deleted') })
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

module.exports = {
    addTripRequest,
    getUserWithRequest,
    updateTripRequest,
    deleteTripRequest,
    getTripRequest
};