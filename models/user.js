'use strict';

const jwt = require('jsonwebtoken');

module.exports = (sequleize, DataTypes) => {
    const User = sequleize.define("userTable", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return jwt.sign({
                    username: this.username
                }, process.env.JWT_SECRET)
            },
            set(tokenObj) {
                return jwt.sign(tokenObj, process.env.JWT_SECRET)
            }
        },
        userRole: {
            type: DataTypes.ENUM('admin', 'school', 'student'),
            allowNull: false,
            defaultValue: 'student'
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get: function () {
                const ACL = {
                    admin: ['read', 'create', 'delete', 'update'],
                    school: ['read', 'create', 'delete'],
                    student: ['read', 'create']
                }
                return ACL[this.userRole];
            }
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        gender: {
            type: DataTypes.ENUM('male', 'female'),
        },
        imageprofile: {
            type: DataTypes.STRING,
            get: function () {
                const ACL = {
                    male: 'https://i.ibb.co/FDfn81H/male.jpg',
                    female: 'https://i.ibb.co/cyQC7J9/female.jpg',
                }
                return ACL[this.gender];
            }
        },


    })



    User.authenticateToket = (token) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return err;
            } else {
                return decode;
            }
        })
    }

    return User;
}