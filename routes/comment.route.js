'use strict';

const express = require('express');
const router = express.Router();
const { commentModel, memoriesModel, UserModel} = require('../models');

router.post('/comment/:userId/:memoryId', addComment);
router.get('/comment/:memoryId', getComments);
router.put('/comment/:id', updateComment);
router.delete('/comment/id', deleteComment);

function addComment(req, res, next) {
  try {
// body:{"userId":"integer","memoryId":"integer","comment":"string","commentDate":"DD/MM/YYYY"}
const memoryData = {
  userId: req.params.userId,
  memoryId: req.params.memoryId,
  comment: req.body.comment,
  commentDate:req.body.commentDate
}
    commentModel.create(memoryData) 
      .then(resolve => { res.status(201).send('done') })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside addComment function : ${err}`);
  }
}

function getComments(req, res, next) {
  try {
    commentModel.findAll({ where: { memoryId: req.params.memoryId } },{ include: [memoriesModel, UserModel] })
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log('no data') });
  } catch (err) {
    next(`Error inside getComments function : ${err}`);
  }
}

function updateComment(req, res, next) {
  try {
    commentModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('updated') })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updateComment function : ${err}`);
  }
}

function deleteComment(req, res, next) {
  try {
    commentModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send(`deleted`) })
      .catch((reject) => { console.log('Cant Delete') });
  } catch (err) {
    next(`Error inside deleteComment function : ${err}`);
  }
}

module.exports = router;