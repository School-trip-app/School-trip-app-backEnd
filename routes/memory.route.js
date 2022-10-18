'use strict';

const express = require('express');
const router = express.Router();
const { memoriesModel, commentModel, UserModel } = require('../models');

router.post('/memory', addMemory);
router.get('/memory', getMemorys);
router.put('/memory/:id', updateMemory);
router.delete('/memory/:id', deleteMemory);

function addMemory(req, res, next) {
  // body:{"userId":"integer","imageUrl":"string","discription":"string","likes":"integer","dislikes":"integer"}
  try {
    memoriesModel.create(req.body)
      .then(resolve => { res.status(201).send('done') })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside addMemory function : ${err}`);
  }
}

function getMemorys(req, res, next) {
  try {
    memoriesModel.findAll({ include: [commentModel, UserModel] })
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log('no data') });
  } catch (err) {
    next(`Error inside getMemorys function : ${err}`);
  }
}

function updateMemory(req, res, next) {
  try {
    memoriesModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('updated') })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updateMemory function : ${err}`);
  }
}

function deleteMemory(req, res, next) {
  try {
    memoriesModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send(`deleted`) })
      .catch((reject) => { console.log('Cant Delete') });
  } catch (err) {
    next(`Error inside deleteMemory function : ${err}`);
  }
}

module.exports = router;