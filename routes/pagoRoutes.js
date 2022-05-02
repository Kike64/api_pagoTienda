const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const auth = require('../middlewares/auth');

router.get('/pago', auth, pagoController.consultarPago);
router.post('/pago', auth, pagoController.registrarPago);
router.put('/pago', auth, pagoController.actualizarPago);

module.exports = router;