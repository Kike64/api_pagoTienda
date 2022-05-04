const { Op } = require("sequelize");
const Pago = require('../models/pago');
const validarVencimiento = require('../services/validarVencimiento');
const validarStatus = require('../services/validarStatus');
const getReferenciaURL = require("../services/requestReferenciaApi");
const generarFechaVigencia = require("../services/generarFechaVigencia");


const consultarPago = async (req, res) => {

    const { referencia, pedido } = req.headers;
    console.log(referencia);
    console.log(pedido);

    var pago;

    try {

        if (referencia && pedido) {
            try {
                pago = await Pago.findOne({
                    attributes: ['MontoPagar', 'URL', 'FechaVencimiento', 'status'],
                    where: {
                        [Op.or]: [
                            { referencia: referencia },
                            { pedido: pedido }
                        ]
                    }
                });
            } catch {
                throw new Error('Error al conectar a la base de datos.', { cause: "06" });
            }

            if (pago) {

                res.json(validarVencimiento(pago));

            } else {

                throw new Error('Referecia No Existe.', { cause: "05" });
            }


        } else {

            throw new Error('Referecia No Existe.', { cause: "05" });

        };

    } catch (e) {
        res.json({
            "CodigoEstatus": e.cause,
            "Mensaje": e.message
        });
    }

};

const registrarPago = async (req, res) => {
    const { body } = req;

    try {
        const pago = Pago.build(body);
        const URL = await getReferenciaURL(pago.referencia);
        const fechaVigencia = await generarFechaVigencia(pago.FechaPedido);
        pago.URL = URL;
        pago.FechaVencimiento = fechaVigencia;

        try {
            await pago.save();
        } catch (e) {
            throw new Error('Error al crear el registro en la base de datos central.', { cause: "06" });
        }


        res.json({
            "CodigoEstatus": "01",
            "Mensaje": "Pago pendiente registrado",
            "referencia": pago.referencia,
            "fecha vigencia": pago.FechaVencimiento,
            "URL": pago.URL
        });

    } catch (e) {
        res.json({
            "CodigoEstatus": e.cause,
            "Mensaje": e.message
        });
    }
};

const actualizarPago = async (req, res) => {

    const { body } = req;
    var pago;

    try {

        try {
            pago = await Pago.findOne({

                where: {
                    [Op.or]: [

                        { pedido: body.pedido },
                        { referencia: body.Referencia }
                    ]
                }
            });

        } catch {
            throw new Error('Error al conectar a la base de datos.', { cause: "06" });
        }

        if (pago) {
            try {
                const result = await validarStatus(pago, body)
                res.json(result);
            } catch {
                throw new Error('Error al conectar a la base de datos.', { cause: "06" });
            }

        } else {
            throw new Error('No se encontro elemento.');
        };

    } catch (e) {
        res.json({
            "CodigoEstatus": e.cause,
            "Mensaje": e.message
        });
    }
};

module.exports = {
    registrarPago,
    consultarPago,
    actualizarPago
};