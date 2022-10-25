'use strict';

const { packageModel, packageWeatherModel, packageImagesModel, tripsOrdersModel, UserModel, photographerModel, hospitalModel, productModel } = require('../models');

const axios = require('axios');



async function addPackage(req, res, next) {
    try {
        let tripCityName = req.body.city;
        let weatherApiResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${tripCityName}&key=8840fcd16a3743e085ae62df20471696`);
        req.body.locationLat = weatherApiResponse.data.lat;
        req.body.locationLon = weatherApiResponse.data.lon;
        const weatherArray = weatherApiResponse.data.data;
        let tripDayWeather = weatherArray.find(item => item.valid_date == req.body.tripDate);
        packageModel.create(req.body)
            .then(createdPackage => {
                const weatherObj = {
                    packageId: createdPackage.id,
                    temp: tripDayWeather.temp,
                    minTemp: tripDayWeather.min_temp,
                    maxTemp: tripDayWeather.max_temp,
                    windSpeed: tripDayWeather.wind_spd,
                    description: tripDayWeather.weather.description,
                }
                packageWeatherModel.create(weatherObj)
                    .then(packageWeather => { })
                    .catch(reject => res.status(501).send(`cant create weather :${reject}`));
                axios.get(`https://api.unsplash.com//search/photos/?client_id=yDXvlsU43Gge_LLbViI2InRB72Jv4eAicowNiKOvi-Q&query=${tripCityName}`)
                    .then(unsplash => {
                        const imagesArray = unsplash.data.results;
                        imagesArray.map(item => {
                            const obj = {
                                packageId: createdPackage.id,
                                imageUrl: item.urls.full,
                            }
                            packageImagesModel.create(obj)
                                .then(packageImage => { })
                                .catch(reject => res.status(501).send(`cant create an image :${reject}`));
                        })
                    })
                    .catch(reject => res.status(501).send(`cant create images :${reject}`));
                // axios.get(`https://nearby-places.p.rapidapi.com/v2/nearby?type=Hospital&lat=${req.body.locationLat}&lng=${req.body.locationLon}&radius=50000`, {
                //   headers: {
                //     'X-RapidAPI-Key': 'd3c907fc37mshb3266e92a8fad15p16e2fajsn1182d2713ad8',
                //     'X-RapidAPI-Host': 'nearby-places.p.rapidapi.com'
                //   }
                // })
                //   .then(resolve => {
                //     resolve.data.results.map(hospital => {
                //       const obj = {
                //         packageId: createdPackage.id,
                //         name: hospital.name,
                //         address: hospital.address,
                //         phone: hospital.phone,
                //         distanceMeter: hospital.distanceMeter,
                //       }
                //       hospitalModel.create(obj)
                //         .then(packageWeather => { })
                //         .catch(reject => res.status(501).send(`cant create hospitals :${reject}`));
                //     })
                //   })
                //   .catch(reject => res.status(501).send(`cant get hospitals info :${reject}`))
                res.status(200).send('Package Created Successfuly');
            })
            .catch(reject => { res.status(501).send(`cant create a package :${reject}`) });
    } catch (err) {
        next(`Error inside addPackage function : ${err}`);
    }
}

function getPackages(req, res, next) {
    try {
        packageModel.findAll({ include: [packageImagesModel, packageWeatherModel, hospitalModel] })
            .then((resolve) => {
                res.status(200).send(resolve);
            })
            .catch((reject) => { console.log('no data') });
    } catch (err) {
        next(`Error inside getPackages function : ${err}`);
    }
}

async function updatePackage(req, res, next) {
    try {
        let packagex = await packageModel.findOne({ where: { id: req.params.id } });
        packageModel.update(req.body, { where: { id: req.params.id } })
            .then(resolve => {
                let bodyKeys = Object.keys(req.body);
                if (bodyKeys.includes("tripDate")) {
                    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${packagex.city}&key=8840fcd16a3743e085ae62df20471696`)
                        .then(weatherData => {
                            const weatherArray = weatherData.data.data;
                            let tripDayWeather = weatherArray.find(item => item.valid_date == req.body.tripDate);
                            const weatherObj = {
                                temp: tripDayWeather.temp,
                                minTemp: tripDayWeather.min_temp,
                                maxTemp: tripDayWeather.max_temp,
                                windSpeed: tripDayWeather.wind_spd,
                                description: tripDayWeather.weather.description,
                            }
                            packageWeatherModel.update(weatherObj, { where: { packageId: packagex.id } })
                                .then(packageWeather => { res.status(200).send('updated with weather') })
                                .catch(reject => res.status(501).send(`cant create weather :${reject}`));
                        })
                        .catch(reject => res.status(501).send(`error inside update weather:${reject}`));
                } else {
                    res.status(200).send('updated')
                }
            })
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
        const id = req.params.id;
        const rateInput = req.body.rateInput;
        const pack = await packageModel.findOne({ where: { id } });
        console.log("RATE>>>>>>>",rateInput, pack.ratePoints,  pack.ratesNumber)

        pack.update({
            ratesNumber: (pack.ratesNumber + 1),
        });
        pack.update({
            ratePoints: pack.ratePoints + rateInput,
        })
        pack.update({
            rate: pack.ratePoints / pack.ratesNumber,
        })
        res.status(200).send('rate updated');
    } catch (err) {
        next(`Error inside updateRate function : ${err}`);
    }
}

async function orderPackage(req, res, next) {
    try {
        const Order = {
            userId: req.params.userId,
            packageId: req.params.packageId,
            // productId:req.params.productId,
            photographerId: req.params.photographerId,
            notes: req.body.notes,
            medicalIssues: req.body.medicalIssues,
            specialFood: req.body.specialFood,
            productIds: req.body.productIds

        }
        tripsOrdersModel.create(Order)
            .then(resolve => { res.status(201).send(`Order sent`) })
            .catch(reject => { res.status(403).send(`Cannot update : ${reject}`) });
    } catch (err) {
        next(`Error inside orderPackage function : ${err}`);
    }
}

async function getOrders(req, res, next) {
    try {
        tripsOrdersModel.findAll({ include: [packageModel, UserModel, photographerModel] })
            .then(resolve => { res.status(201).send(resolve) })
            .catch(reject => { res.status(403).send(`Cannot update : ${reject}`) });
    } catch (err) {
        next(`Error inside orderPackage function : ${err}`);
    }
}

async function deleteOrder(req, res, next) {
    try {
        tripsOrdersModel.destroy({ where: { id: req.params.id } })
            .then(resolve => { res.status(201).send(resolve) })
            .catch(reject => { res.status(403).send(`Cannot update : ${reject}`) });
    } catch (err) {
        next(`Error inside orderPackage function : ${err}`);
    }
}

async function selectOrder(req, res) {
    try {
        const id = req.params.id;
        const chooseOrder = await tripsOrdersModel.findOne({ where: { id }, include: [packageModel, UserModel, photographerModel] });
        let pricePackage = chooseOrder.package.price;
        let pricePhotoger = chooseOrder.photographer.price;
        let arrayOrder = chooseOrder.productIds
        const products = await productModel.findAll({ where: { id: arrayOrder } });

        let productPrice = products.reduce((acc, curr) => acc.price + curr.price);
       
            chooseOrder.update({
                totalPric: pricePackage + pricePhotoger + productPrice
            });

            res.status(200).json({
                chooseOrder,
                products
            });
        
    } catch (error) {
        console.log(error);
    }
}





module.exports = {
    selectOrder,
    deleteOrder,
    getOrders,
    orderPackage,
    updateRate,
    deletePackage,
    updatePackage,
    getPackages,
    addPackage
};