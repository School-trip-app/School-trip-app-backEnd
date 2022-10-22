const router = require('express').Router();
const controller = require('./controller');

// const subscriptionMiddleware = {

// }



router.post('/subscribe',controller.createSubscription);



module.exports = router;