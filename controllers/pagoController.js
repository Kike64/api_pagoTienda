const { Op, Sequelize } = require("sequelize");
const Pago = require('../models/pago');
const validarVencimiento = require('../services/validarVencimiento');
const validarStatus = require('../services/validarStatus');
const getReferenciaURL = require("../services/requestReferenciaApi");
const generarFechaVigencia = require("../services/generarFechaVigencia");


const consultarPago = async (req, res) => {

    const { Referencia, pedido } = req.body;

    if (Referencia && pedido) {
        try {
            const pago = await Pago.findOne({
                attributes: ['MontoPagar', 'URL', 'FechaVencimiento', 'status'],
                where: {
                    [Op.or]: [
                        { referencia: Referencia },
                        { pedido: pedido }
                    ]
                }
            });

            if (pago) {

                res.json(validarVencimiento(pago));

            } else {

                res.json({
                    "Codigo estatus": "05",
                    "Mensaje": "Referecia no existe"
                });
            }
        } catch {
            res.json({
                "Codigo estatus": "04",
                "mensaje": "No fue posible conexión"
            });
        }
    } else {

        res.json({ "mensaje": "Referencia y/o pedido no especificados" });

    };
};

const registrarPago = async (req, res) => {
    const { body } = req;

    try {
        const pago = Pago.build(body);
        const URL = await getReferenciaURL(pago.referencia);
        const fechaVigencia = await generarFechaVigencia(pago.FechaPedido);
        pago.URL = URL;
        pago.FechaVencimiento = fechaVigencia;

        await pago.save();

        res.json({
            "Codigo estatus": "01",
            "Mensaje": "Pago pendiente registrado",
            "fecha vigencia": pago.FechaVencimiento,
            "URL": pago.URL
        });
    } catch {
        res.json({
            "Codigo estatus": "02",
            "Mensaje": "Error en conexion"
        });
    }
};

const actualizarPago = async (req, res) => {


    const { body } = req;

    try {
        const pago = await Pago.findOne({
            where: {
                [Op.or]: [
                    { referencia: body.Referencia },
                    { pedido: body.pedido }
                ]
            }
        });

        if (pago) {

            const result = await validarStatus(pago, body)
            res.json(result);

        } else {
            res.json({
                "Codigo estatus": "04",
                "Mensaje": "No se encontro elemento"
            });
        };

    } catch {
        res.json({
            "Codigo estatus": "04",
            "Mensaje": "No fue posible conexión"
        });
    }
};

module.exports = {
    registrarPago,
    consultarPago,
    actualizarPago
};