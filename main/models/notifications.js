const { DataTypes} = require('sequelize');

module.exports = notifications;

function notifications(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        subject: { type: DataTypes.STRING, allowNull: false },
        message: { type: DataTypes.TEXT, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: true },
        notification_user_id: { type: DataTypes.INTEGER, allowNull: true },
        read: { type: DataTypes.INTEGER, allowNull: true },
    }
    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('notifications', attributes, options)
}


function countries(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: { type: DataTypes.TEXT, allowNull: false }    }
    const options = {
       
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('countries', attributes, options)
}