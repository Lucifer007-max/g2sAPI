const { DataTypes } = require('sequelize');

module.exports = G2Sinstitution;

function G2Sinstitution(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        institutionname: { type: DataTypes.STRING, allowNull: false },
        institutionemail: { type: DataTypes.STRING, allowNull: false },
        institutionpassword: { type: DataTypes.STRING, allowNull: false },
        institutionimg: { type: DataTypes.STRING, allowNull: false },
        Type: { type: DataTypes.INTEGER, allowNull: false },
    };

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

    return sequelize.define('G2Sinstitution', attributes, options);
}