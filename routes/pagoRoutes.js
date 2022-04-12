const express = require('express');
const pagoController = require('../controllers/pagoController');
const router = express.Router();


router.get('/pago', pagoController.consultarPago);
router.post('/pago', pagoController.registrarPago);

module.exports = router;