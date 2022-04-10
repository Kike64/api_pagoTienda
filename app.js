require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT;

app.set('port', PORT || 3000);

module.exports = app;