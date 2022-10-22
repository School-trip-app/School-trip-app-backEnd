const stripe = require('stripe')('sk_test_51Lt60rELquJMXRkobUaOv31blbzxJYGpUSC0buCUtbEhO1hK4QPSqzMxaMqbypwCZLDCiOmTgQGiBvno4na5WhZZ00XYwTmNzv');


const service = {};

service.createSubscription = (customerId, items) => {
       return stripe.subscriptions.create({
              customer: customerId,
              items: items
       });
}


module.exports = service;