'use strict';
const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
})

const upload = multer({ storage: storage });

router.get("/upload", (req, res) => {
  res.render("upload");
})


router.post("/upload", upload.single('image'), (req, res) => {
  res.send('Done Image Uploaded');
})


module.exports = router;