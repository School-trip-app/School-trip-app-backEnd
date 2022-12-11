"use strict";


const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
=======
const { notFound } = require('./errorHandlers/404');
const { internalError } = require('./errorHandlers/500');
const userRouter = require('./routes/user');
const packageRouter = require('./routes/package.route');
const packageDetailsRouter = require('./routes/packageDetails.route');
const packageImagesRouter = require('./routes/packageImages.route');
const tripRequestRouter = require('./routes/tripRequest.route');
const memoryRouter = require('./routes/memory.route');
const comment = require('./routes/comment.route');
const productRouter = require('./routes/product.route');
const paymentDetails = require('./routes/paymentDetial.route');
const payment = require('./routes/payment.route');

// const stripe = require("./routes/payment");
>>>>>>> f5661b980d8352283c55058b6bd5c63416a1d53c

const photographerRouter = require('./routes/photographer.route');
// const stripe = require("./routes/payment");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser")


const app = express();
app.use(cors());
app.use(express.json());
const userRouter = require('./routes/user');

app.use(userRouter);
<<<<<<< HEAD
=======
app.use(paymentDetails);
app.use(packageRouter);
app.use(packageDetailsRouter);
app.use(packageImagesRouter);
app.use(tripRequestRouter);
app.use(memoryRouter);
app.use(comment);
app.use(productRouter);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(photographerRouter);
app.use(payment);
app.use(notFound);
app.use(internalError);
>>>>>>> f5661b980d8352283c55058b6bd5c63416a1d53c

const start = (port) => {
    app.listen(port, () => console.log(`Up running on port ${port}`));
}

module.exports = {
<<<<<<< HEAD
    start,
=======
  start,
  app
>>>>>>> f5661b980d8352283c55058b6bd5c63416a1d53c
}
