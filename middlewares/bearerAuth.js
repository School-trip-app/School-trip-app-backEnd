'use strict';

const { UserModel } = require("../models/index");
/* istanbul ignore next */

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) (
        next('Invalid login')
    )
    try {
        console.log(">>>>>>>>>>>>", req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            console.log("The token is Empty");
        }
        const validUser = UserModel.authenticateToket(token);
        const userInfo = await UserModel.findOne({ where: { username: validUser.username } });
        if (userInfo) {
            req.user = userInfo;
            req.token = userInfo.token;
            next();
        } else {
            next('Invalid login')
        }

    } catch (error) {
        next(error.message || error);
    }
}
