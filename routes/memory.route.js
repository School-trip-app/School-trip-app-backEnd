'use strict';

const router = require('express').Router();

const { addMemory,
  getMemorys,
  deleteMemory,
  updateLike,
  updateDislike,
  updateMemory, upload } = require('../controllers/memory');

router.post('/memory', upload, addMemory);
router.get('/memory', getMemorys);
router.put('/memory/:id', updateMemory);
router.delete('/memory/:id', deleteMemory);
router.patch('/like/:id', updateLike);
router.patch('/dislike/:id', updateDislike);


module.exports = router;
