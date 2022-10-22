"use strict";

require('dotenv').config();
const { db } = require('./models');

const server = require('./server');
// const bodyParser = require("body-parser");

// const stripe = require("./routes/payment");



// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


db.sync({force : true})
  .then(() => {
    server.start(process.env.PORT || 4000);
  }).catch((err) => console.log(err));


