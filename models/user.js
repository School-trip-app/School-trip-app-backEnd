'use strict';

const jwt = require('jsonwebtoken');

module.exports = (sequleize, DataTypes) => {
    const User = sequleize.define("user", {
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
            type: DataTypes.ENUM('admin', 'school', 'student', 'enabledSchool'),
            allowNull: false,
            defaultValue: 'student'
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get: function () {
                const ACL = {
                    admin: ['read', 'create', 'delete', 'update'],
                    school: ['read', 'create'],
                    student: ['read', 'create'],
                    enabledSchool: ['read', 'create', 'canBookTrip', 'update', 'delete']
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
        image: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        imageprofile: {
            type: DataTypes.STRING,
            allowNull:true,
            // defaultValue: this.gender == "male" ? 'https://i.ibb.co/FDfn81H/male.jpg' : '',
            // get: function () {
            //     const ACL = {
            //         male: 'https://i.ibb.co/FDfn81H/male.jpg',
            //         female: 'https://i.ibb.co/cyQC7J9/female.jpg',
            //     }
            //     return ACL[this.gender];
            // }
        },
    });
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