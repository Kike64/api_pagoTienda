require('dotenv').config();
const express = require('express');
const pagoRoutes = require('./routes/pagoRoutes');

const app = express();
const PORT = process.env.PORT;

app.set('port', PORT || 3000);

app.use(express.json());

app.use('/api', pagoRoutes);

module.exports = app;