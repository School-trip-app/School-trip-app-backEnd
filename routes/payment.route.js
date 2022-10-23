'use strict' ;
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();
const router = express.Router();

router.post(/payment/, async (req, res) => {
  let {amount, id} = req.body;
  try {

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Journey",
      payment_method: id,
      confirm: true

    })
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true
    })
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false
    })
  }
})
 module.exports = router;