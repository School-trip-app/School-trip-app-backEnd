'use strict';

const { packageImagesModel, packageModel } = require('../models');


function addPackageImages(req, res, next) {
  //{"packageId":"INTEGER","imageUrl":"STRING"}
  try {
    const packageImagesData = {
      packageId: req.params.packageId,
      imageUrl: req.body.imageUrl
    }
    packageImagesModel.create(packageImagesData)
      .then(resolve => { res.status(201).send('done') })
      .catch(reject => { res.status(306).send(reject) });
  } catch (err) {
    next(`Error inside addPackageImages function : ${err}`);
  }
}

function getPackageImages(req, res, next) {
  try {
    packageImagesModel.findAll({ where: { packageId: req.params.packageId }, include: [packageModel] })
      .then((resolve) => {
        res.status(200).send(resolve);
      })
      .catch((reject) => { console.log('no data') });
  } catch (err) {
    next(`Error inside getPackageImages function : ${err}`);
  }
}

function updatePackageImages(req, res, next) {
  try {
    packageImagesModel.update(req.body, { where: { id: req.params.id } })
      .then(resolve => { res.status(200).send('updated') })
      .catch(reject => { console.log(`cannot update`) });
  } catch (err) {
    next(`Error inside updatePackageImages function : ${err}`);
  }
}

function deletePackageImages(req, res, next) {
  try {
    packageImagesModel.destroy({ where: { id: req.params.id } })
      .then((resolve) => { res.status(202).send(`deleted`) })
      .catch((reject) => { console.log('Cant Delete') });
  } catch (err) {
    next(`Error inside deletePackageImages function : ${err}`);
  }
}
module.exports = {
    deletePackageImages,
    updatePackageImages,
    getPackageImages,
    addPackageImages
}