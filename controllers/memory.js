'use strict';


const { memoriesModel, commentModel, UserModel } = require('../models');

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

/* istanbul ignore next */
async function getMemorys(req, res, next) {
  try {
    await memoriesModel.findAll({ include: [commentModel, UserModel] })
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log(reject) });
  } catch (err) {
    next(`Error inside getMemorys function : ${err}`);
  }
}

/* istanbul ignore next */
async function updateMemory(req, res, next) {
  try {
    await memoriesModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { console.log(reject) });
  } catch (err) {
    next(`Error inside updateMemory function : ${err}`);
  }
}

async function deleteMemory(req, res, next) {
  try {
    await memoriesModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).end(); })
      .catch((reject) => { console.log(reject) });
  } catch (err) {
    next(`Error inside deleteMemory function : ${err}`);
  }
}

/* istanbul ignore next */
async function updateLike(req, res, next) {
  try {
    const memory = await memoriesModel.findOne({ where: { id: req.params.id } })
    const likes = memory.likes + 1 ;
    await memoriesModel.update({likes: likes}, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { console.log(reject) });
  } catch (err) {
    next(`Error inside updateLike function : ${err}`);
  }
}

/* istanbul ignore next */
async function updateDislike(req, res, next) {
  try {
    const memory = await memoriesModel.findOne({ where: { id: req.params.id } })
    const dislikes = memory.dislikes + 1 ;
    await memoriesModel.update({dislikes: dislikes}, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send(resolve) })
      .catch(reject => { console.log(reject) });
  } catch (err) {
    next(`Error inside updateDislike function : ${err}`);
  }
}

module.exports = {
    addMemory,
    getMemorys,
    deleteMemory,
    updateLike,
    updateDislike,
    updateMemory
}