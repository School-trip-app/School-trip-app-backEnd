const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comment');

router.post('/comments', commentsController.addComment);
router.get('/memories', commentsController.getMemoriesWithComments);

module.exports = router;
