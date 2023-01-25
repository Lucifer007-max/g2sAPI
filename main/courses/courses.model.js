const { DataTypes } = require('sequelize');

module.exports = G2Scourses;

function G2Scourses(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        coursename: { type: DataTypes.STRING, allowNull: false },
        courseamt: { type: DataTypes.INTEGER, allowNull: false },
        courseimage: { type: DataTypes.INTEGER, allowNull: false },
        coursestatus: { type: DataTypes.INTEGER, allowNull: false },
        courseprofileDetails: { type: DataTypes.TEXT, allowNull: false },
        courseofferDetails: { type: DataTypes.TEXT, allowNull: false },
        courseType: { type: DataTypes.INTEGER, allowNull: false },
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

    return sequelize.define('G2Scourses', attributes, options);
}