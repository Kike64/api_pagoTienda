const { Op } = require("sequelize");
const Pago = require('../models/pago');
const validarVencimiento = require('../helpers/validarVencimiento');

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
                "mensaje": "No fue posible conexión "
            });
        }
    } else {

        res.json({ "mensaje": "Referencia y/o pedido no especificados" });

    };
};

const registrarPago = async (req, res) => {
    const { name, description } = req.body;
    console.log(name, description);

    res.json("nuevo")
};

const actualizarPago = async (req, res) => {


    res.json("nuevo")
};

module.exports = {
    registrarPago,
    consultarPago,
    actualizarPago
};