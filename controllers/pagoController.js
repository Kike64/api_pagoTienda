const connection = require('../database/connection')

const consultarPago = async (req, res) => {

    try {
        const pool = await connection;
        const result = await pool.request().query('SELECT * FROM Bitacora_PagosTiendaWEB');
        res.json(result.recordset[0]);
    } catch {
        res.json({
            "Codigo Estatus": 4,
            "mensaje": "No fue posible la conexión"
        });
    }
};

const registrarPago = async (req, res) => {
    const {name, description} = req.body;
    console.log(name, description);

    res.json("nuevo")
};

module.exports = {
    registrarPago,
    consultarPago
};