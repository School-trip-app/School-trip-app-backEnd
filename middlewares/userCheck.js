"use strict";


const { UserModel } = require('../models');


const checkUser = async (req, res, next) => {
  try {
    const existingUsername = await UserModel.findOne({ where: { username: req.body.username } });
    if (existingUsername) {
      return res.status(409).json({
        message: 'This username is already in use.'
      });
    }

    const existingEmail = await UserModel.findOne({ where: { email: req.body.email } });
    if (existingEmail) {
      return res.status(409).json({
        message: 'This email is already in use.'
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};
module.exports = {
  checkUser
}