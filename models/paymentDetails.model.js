"use strict";



module.exports = (sequelize, DataTypes) => {

  const paymentDetialsModel = sequelize.define("paymentdetials", {
    name: { type: DataTypes.STRING, allowNull: true },
    namePackage: { type: DataTypes.STRING, defaultValue: 0 },
    totapPay: { type: DataTypes.INTEGER, defaultValue: 0 }
  })
  return paymentDetialsModel;
}
