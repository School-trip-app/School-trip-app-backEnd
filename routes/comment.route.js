'use strict';

const router = require('express').Router();

const { addComment, deleteComment, getMemoryComments, updateComment } = require('../controllers/comment');

router.post('/comment/:userId/:memoryId', addComment);
router.get('/comment/:memoryId', getMemoryComments);
router.put('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);

module.exports = router;