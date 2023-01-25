const { DataTypes} = require('sequelize');



module.exports = G2scontact;

function G2scontact(sequelize){
    const attributes ={
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullname: {type : DataTypes.STRING , allowNull: false},
        email : {type : DataTypes.STRING , allowNull: false},
        subject: {type : DataTypes.STRING , allowNull: false},
        msg: {type : DataTypes.TEXT , allowNull: false},
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
    return sequelize.define('G2scontact' , attributes , options)
}