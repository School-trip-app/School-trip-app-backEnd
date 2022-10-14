'use strict';

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
        userRole: {
            type: DataTypes.STRING,
            allowNull: null,
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get: () => {
                const ACL = {
                    admin: ['read', 'create', 'delete', 'update'],
                    student: ['read', 'create'],
                    school: ['read', 'create', 'delete'],
                }
                return ACL[this.userRole];
            }
        }
    })
    return User;
}