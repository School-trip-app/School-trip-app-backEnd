'use strict';

const express = require('express');
const router = express.Router();
const { memoriesModel, commentModel, UserModel } = require('../models');

router.post('/memory/:userId', addMemory);
router.get('/memory', getMemorys);
router.put('/memory/:id', updateMemory);
router.delete('/memory/:id', deleteMemory);
router.patch('/like/:id', updateLike);
router.patch('/dislike/:id', updateDislike);

async function addMemory(req, res, next) {
  //body:{"userId":"integer","imageUrl":"string","discription":"string","likes":"integer","dislikes":"integer"}
  try {
    const memoryData={
      userId:req.params.userId,
      imageUrl:req.body.imageUrl,
      discription:req.body.discription,
      likes:req.body.likes,
      dislikes:req.body.dislikes
    }
    await memoriesModel.create(memoryData)
      .then(resolve => { res.status(201).send(resolve) })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside addMemory function : ${err}`);
  }
}

async function getMemorys(req, res, next) {
  try {
    await memoriesModel.findAll({ include: [commentModel, UserModel] })
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log('no data') });
  } catch (err) {
    next(`Error inside getMemorys function : ${err}`);
  }
}

async function updateMemory(req, res, next) {
  try {
    await memoriesModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updateMemory function : ${err}`);
  }
}

async function deleteMemory(req, res, next) {
  try {
    await memoriesModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send(`deleted`) })
      .catch((reject) => { console.log('Cant Delete') });
  } catch (err) {
    next(`Error inside deleteMemory function : ${err}`);
  }
}

async function updateLike(req, res, next) {
  try {
    const memory = await memoriesModel.findOne({ where: { id: req.params.id } })
    const likes = memory.likes + 1 ;
    await memoriesModel.update({likes: likes}, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updateLike function : ${err}`);
  }
}
async function updateDislike(req, res, next) {
  try {
    const memory = await memoriesModel.findOne({ where: { id: req.params.id } })
    const dislikes = memory.dislikes + 1 ;
    await memoriesModel.update({dislikes: dislikes}, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updateDislike function : ${err}`);
  }
}

module.exports = router;