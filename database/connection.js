require('dotenv').config();
const Sequelize = require('sequelize');

const DATABASE = process.env.DATABASE;
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const HOST = process.env.DB_HOST;

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