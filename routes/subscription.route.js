'use strict';
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();



app.post("/subscribe", async (req, res) => {
  try {
    const { payment_method } = req.body;
    const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent");
    const customer = await stripe.customers.create({
      //TODO: get user details from db or from incoming request
      

      
      payment_method: payment_method,
      email: "rudrakshdixit@gmail.com",
      description: "Subscription",
      shipping: {
        name: "RD",
        address: {
          line1: "510",
          postal_code: "10115",
          city: "Amman",
          state: "Jordan",
          country: "jordan",
        },
      },
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ["sepa_debit"],
      customer: customer.id,
      confirm: true,
      payment_method: payment_method,
      mandate_data: {
        customer_acceptance: {
          type: "online",
          online: { ip_address: ip, user_agent: userAgent },
        },
      },
    });
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: "price_1LugTrELquJMXRkoNfNDcYUr",
        },
      ],
      expand: ["latest_invoice.payment_intent"],
    });
    console.log(subscription);
    res.json({ subscription: subscription });
  } catch (err) {
    console.log(err);
  }
});