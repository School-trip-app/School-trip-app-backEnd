'use strict';
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();
const router = express.Router();


router.post('/payment', async function (req, res, next) {
  let paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 9,
      exp_year: 2022,
      cvc: '314',
    },
  });
  paymentIntent = await stripe.paymentIntents.create({
    payment_method: paymentMethod.id,
    amount: 75 * 100, // USD*100
    currency: 'inr',
    confirm: true,
    payment_method_types: ['card'],
  });

  res.send(paymentIntent);
});
module.exports = router;