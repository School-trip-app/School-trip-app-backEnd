"use strict";



require('dotenv').config();
const { db } = require('./modules/index');

const server = require('./server');

<<<<<<< HEAD
db.sync().then(() => {
=======


db.sync()
  .then(() => {
>>>>>>> f5661b980d8352283c55058b6bd5c63416a1d53c
    server.start(process.env.PORT || 4000);
}).catch((err) => console.log(err));


