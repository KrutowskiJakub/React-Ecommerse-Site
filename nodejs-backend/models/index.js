const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('react-ecomerse-db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const User = sequelize.define('User', {
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false, // Disable the automatic addition of createdAt and updatedAt fields
});

module.exports = { sequelize, User };