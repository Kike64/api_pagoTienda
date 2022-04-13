const { Op, Sequelize } = require("sequelize");
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
            switch (pago.status) {
                case 1:
                    
                    await pago.update(body);

                    switch (body.status) {
                        case 2:
                            await pago.update(body);
                            res.json({
                                "Codigo Estatus": "01",
                                "Mensaje": "Estatus actualizado a pagado correctamente",
                                "Monto": pago.MontoPagar
                            });
                            break;
                        case 3:
                            await pago.update(body);
                            res.json({
                                "Codigo Estatus": "01",
                                "Mensaje": "Estatus actualizado a completado correctamente",
                                "Monto": pago.MontoPagar
                            });
                            break;
                        case 4:
                            await pago.update(body);
                            res.json({
                                "Codigo Estatus": "01",
                                "Mensaje": "Estatus actualizado a cancelado correctamente",
                                "Monto": pago.MontoPagar
                            });
                            break;
                        case 5:
                            await pago.update(body);
                            res.json({
                                "Codigo Estatus": "01",
                                "Mensaje": "Estatus actualizado a vencido correctamente",
                                "Monto": pago.MontoPagar
                            });
                            break;
                        default:
                            res.json({
                                "mensaje": "Error de actualizacion"
                            });
                    }
                    break;

                case 2:
                    res.json({
                        "Codigo Estatus": "02",
                        "Mensaje": "El estatus ya se encuentra como pagado",
                        "Monto": pago.MontoPagar
                    });
                    break;
                case 4:
                    res.json({
                        "Codigo Estatus": "03",
                        "Mensaje": "El estatus estaba como cancelado",
                        "Monto": pago.MontoPagar
                    });
                    break;
                default:
                    res.json({ "mensaje": `status ${pago.status}` })
            };
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