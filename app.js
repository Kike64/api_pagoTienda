const express = require('express');
const pagoRoutes = require('./routes/pagoRoutes');
const config = require('./config.json');

const app = express();
const PORT = config.PORT;

app.set('port', PORT);

app.use(express.json());

app.use('/api', pagoRoutes);

module.exports = app;