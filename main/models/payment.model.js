const { DataTypes} = require('sequelize');

module.exports = payment;

function payment(sequelize){
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: { type: DataTypes.INTEGER, allowNull: true },
        amount : { type : DataTypes.INTEGER ,  allowNull : false },
    }
    const options = {
        defaultScope: {
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('payment', attributes, options)
}