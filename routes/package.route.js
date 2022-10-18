'use strict';
const express = require('express');
const router = express.Router();
const { packageModel, packageDetailsModel, packageImagesModel } = require('../models');
const axios = require('axios');

router.post('/package', addPackage);
router.get('/package', getPackages);
router.put('/package/:id', updatePackage);
router.delete('/package/:id', deletePackage);
router.put('/package/rate/:id', updateRate);
// router.post('/package/order', orderPackage);







async function addPackage(req, res, next) {
  /* 
  body :{
    "packageName":"",
    "locationName":"",
    "packageDiscription":"",
    "date":"DD/MM/YYYY",
    "weatherURL":""
  }


  {
    "packageName": "FirsPackage",
    "locationName": "Aqaba" ,
    "packageDiscription": "first trip to aqaba",
    "tripDate": 5-DEC-2022,
    "numberOfPeople":20 ,
    "startingTime":"10:00 am" ,
    "endingTime": "07:00 pm",
    "price": "10JD/person",
    "meals":"breakfast",
    }
  */
  try {
    let location = req.body.locationName;
    // let response = await axios.get(`https://api.serpwow.com/search?api_key=14F38C62E6CA4AA597506C5589A3FC8C&engine=google&q=${location}&page=1&max_page=4&num=4`);
    // req.body.locationUrl = response.data.search_information.search_tabs[1].link;
    packageModel.create(req.body)
      .then((resolve) => {
        axios.get(`https://api.unsplash.com//search/photos/?client_id=yDXvlsU43Gge_LLbViI2InRB72Jv4eAicowNiKOvi-Q&query=${location}`)
          .then(reso => {
            const arr = reso.data.results;
            arr.map(item => {
              const obj = {
                packageId: resolve.id,
                imageUrl: item.urls.full,
              }
              packageDetailsModel.create(obj)
                .then(resolve => { })
                .catch(reject => console.log(reject));
            })
            res.status(201).send('done')
          }).catch(err => console.log(err));
      })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside addPackage function : ${err}`);
  }
}

function getPackages(req, res, next) {
  try {
    packageModel.findAll({ include: [packageDetailsModel, packageImagesModel] })
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log('no data') });
  } catch (err) {
    next(`Error inside getPackages function : ${err}`);
  }
}

function updatePackage(req, res, next) {
  try {
    packageModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('updated') })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updatePackage function : ${err}`);
  }
}

function deletePackage(req, res, next) {
  try {
    packageModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send(`deleted`) })
      .catch((reject) => { console.log('Cant Delete') });
  } catch (err) {
    next(`Error inside deletePackage function : ${err}`);
  }
}

async function updateRate(req, res, next) {
  try {
    const packagee = await packageModel.findOne({ where: { id: req.params.id } })
    const userRate = req.body.rate;
    const ratesNumber = packagee.ratesNumber + 1;
    let newRate = (packagee.rate + userRate) / `${ratesNumber}`;
    packageModel.update({ rate: `${newRate}`, ratesNumber: ratesNumber }, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('rate updated') })
      .catch(reject => { console.log(`${reject}`) });
  } catch (err) {
    next(`Error inside updateRate function : ${err}`);
  }
}




module.exports = router;