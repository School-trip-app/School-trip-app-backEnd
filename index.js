"use strict";

require('dotenv').config();
const { db } = require('./models');

const server = require('./server');



db.sync({force:true})
  .then(() => {
    server.start(process.env.PORT || 4000);
  }).catch((err) => console.log(err));


