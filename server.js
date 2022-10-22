"use strict";


const express = require('express');
const cors = require('cors');
const { notFound } = require('./errorHandlers/404');
const { internalError } = require('./errorHandlers/500');
const userRouter = require('./routes/user');
const packageRouter = require('./routes/package.route');
const packageDetailsRouter = require('./routes/packageDetails.route');
const packageImagesRouter = require('./routes/packageImages.route');
const tripRequestRouter = require('./routes/tripRequest.route');
const memoryRouter = require('./routes/memory.route');
const commentRouter = require('./routes/comment.route');
// const stripe = require("./routes/payment");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const http = require('http');

const routes = require('./stripe-module/router');

const app = express();

//Payment Route

const bodyparser = require('body-parser')
const path = require('path')
var Publishable_Key = 'pk_test_51Lt60rELquJMXRkoYhRzgC2HcvPXkwW5t11sGjm25d58cSzuGUrxsm9RH4FQb873WSznVt6Te8uUjDSoxKnHl72A00jrL6fzvp'
var Secret_Key = 'sk_test_51Lt60rELquJMXRkobUaOv31blbzxJYGpUSC0buCUtbEhO1hK4QPSqzMxaMqbypwCZLDCiOmTgQGiBvno4na5WhZZ00XYwTmNzv' 
 
const stripe = require('stripe')(Secret_Key)


app.use(express.static('public'))
app.engine('html', require('ejs').renderFile)


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



app.get('/', function(req, res){
  res.render('Home', {
     key: Publishable_Key
  })
})


app.post('/payment', function(req, res){
 
  // Moreover you can take more details from user
  // like Address, Name, etc from form
  stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: 'Suhaib',
      address: {
          line1: 'TC 9/4 Old MES colony',
          postal_code: '1171',
          city: 'amman',
          state: 'amman',
          country: 'Jordan',
      }
  })
  .then((customer) => {

      return stripe.charges.create({
          amount: 2500,     // Charging Rs 25
          description: 'Trip',
          currency: 'USD',
          customer: customer.id
      });
  })
  .then((charge) => {
      res.send("Success")  // If no error occurs
  })
  .catch((err) => {
      res.send(err)       // If some error occurs
  });
})

// end of payment route
// subscribe route

// const service = {};
// service.createSubscription = (customerId, items) => {
//        return stripe.subscriptions.create({
//               customer: customerId,
//               items: items
//        });
// }
// const controller = {};
// controller.createSubscription = async(req, res) => {
//     const { customerId, items } = req.body;
//     try {
//       const subscription = 
//               await service.createSubscription(customerId, items);
//       res.json({ response: subscription });
//     } catch (error) {
//       console.error(error);
//       return res.status(400).json({ error: error.message });
//     }
// };

// const router = require('express').Router();

// const subscriptionMiddleware = [
//       controller.createSubscription
// ];
// router.post('/subscribe', subscriptionMiddleware)



// end of subscribe route



app.use(cors());
app.use('/Images', express.static('./Images'));
app.use(express.json());
app.use(userRouter);
app.use(packageRouter);
app.use(packageDetailsRouter);
app.use(packageImagesRouter);
app.use(tripRequestRouter);
app.use(memoryRouter);
app.use(commentRouter);

app.use(notFound);
app.use(internalError);
app.use(routes);

// app.use("/api/stripe",stripe);

// app.use(/payment/, router);



app.use(express.static('public'))
app.engine('html', require('ejs').renderFile)




app.get('/', async function (
  req,
  res,
  next
) {
  res.status(200).render('login.ejs')
})





const start = (port) => {
  app.listen(port, () => console.log(`Up running on port ${port}`));
}

module.exports = {
  start,
}
