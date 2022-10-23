"use strict";


const { UserModel } = require('../models');


const checkUser = async (req, res, next) => {
  try {
    const userName = await UserModel.findOne({ where: { username: req.body.username } });
    if (userName) {
      res.status(409).json({
        message: 'this userName is exists'
      });
    }
    const email = await UserModel.findOne({ where: { email: req.body.email } });
    if (email) {
      res.status(409).json({
        message: 'this email is exists'
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  checkUser
}