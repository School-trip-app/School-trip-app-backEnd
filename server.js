"use strict";


const express = require('express');
const cors = require('cors');
const { notFound } = require('./errorHandlers/404');
const { internalError } = require('./errorHandlers/500');
const userRouter = require('./routes/user');
const packageRouter = require('./routes/package.route');


const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(packageRouter);

app.use(notFound);
app.use(internalError);

const start = (port) => {
  app.listen(port, () => console.log(`Up running on port ${port}`));
}

module.exports = {
  start,
}
