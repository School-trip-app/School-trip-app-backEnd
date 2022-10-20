"use strict";


const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const userRouter = require('./routes/user');

app.use(userRouter);

const start = (port) => {
    app.listen(port, () => console.log(`Up running on port ${port}`));
}

module.exports = {
    start,
}
