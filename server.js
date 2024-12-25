"use strict";

const express = require('express');
const http = require('http');
const cors = require('cors');
const { notFound } = require('./errorHandlers/404');
const { internalError } = require('./errorHandlers/500');
const userRouter = require('./routes/user');
const packageRouter = require('./routes/package.route');
const packageDetailsRouter = require('./routes/packageDetails.route');
const packageImagesRouter = require('./routes/packageImages.route');
const tripRequestRouter = require('./routes/tripRequest.route');
const memoryRouter = require('./routes/memory.route');
const productRouter = require('./routes/product.route');
const paymentDetails = require('./routes/paymentDetial.route');
const payment = require('./routes/payment.route');
const photographerRouter = require('./routes/photographer.route');
const commentsRouter = require('./routes/comment.route');
const likesRouter = require('./routes/likes.route');
const bodyParser = require("body-parser");
const { initializeWebSocket } = require('./websocket');  // Import WebSocket initialization
const multer = require('multer');
const upload = multer();

const app = express();
const server = http.createServer(app);  // Set up HTTP server

initializeWebSocket(server);




// Middleware and Routes setup
app.use(cors());
app.use('/Images', express.static('./Images'));
app.use(express.json());
app.use(userRouter);
app.use(paymentDetails);
app.use(packageRouter);
app.use(packageDetailsRouter);
app.use(packageImagesRouter);
app.use(tripRequestRouter);
app.use(memoryRouter);
app.use(productRouter);
app.use(commentsRouter)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(photographerRouter);
app.use(likesRouter)
app.use(payment);
app.use(notFound);
app.use(internalError);
app.use(upload.none());

const start = (port) => {
  server.listen(port, () => console.log(`Up running on port ${port}`));
};

// Export the broadcastEvent function for use in other modules
module.exports = {
  start,
  app,
};
