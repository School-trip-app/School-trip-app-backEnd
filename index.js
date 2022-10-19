"use strict";
const express = require("express");
const app = express();
require('dotenv').config();
const { db } = require('./models');
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("./routes/payment");
const server = require('./server');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

db.sync()
  .then(() => {
    server.start(process.env.PORT || 4000);
  }).catch((err) => console.log(err));


