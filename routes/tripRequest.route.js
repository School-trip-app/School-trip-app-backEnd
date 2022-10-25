'use strict';

const router = require('express').Router();
const { addTripRequest,
  getUserWithRequest,
  updateTripRequest,
  deleteTripRequest,
  getTripRequest } = require('../controllers/tripRequest');


router.post('/tripRequest', addTripRequest);
router.get('/tripRequest', getTripRequest);
router.put('/tripRequest/:id', updateTripRequest);
router.delete('/tripRequest/:id', deleteTripRequest);
router.get('/usersWithRequest', getUserWithRequest);

module.exports = router;