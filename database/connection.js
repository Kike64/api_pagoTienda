//const sql = require('mssql');
const Sequelize = require('sequelize');

const db = new Sequelize('Apartado_Central', 'kike', 'contra', {
    host: 'localhost',
    dialect: 'mssql'
});

const test = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = db;