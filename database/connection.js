const Sequelize = require('sequelize');
const config = require('../config.json');

const DATABASE = config.DATABASE;
const USER = config.DB_USER;
const PASS = config.DB_PASS;
const HOST = config.DB_HOST;

const db = new Sequelize(DATABASE, USER, PASS, {
    host: HOST,
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