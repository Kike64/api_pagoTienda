const axios = require('axios');
const config = require('../config.json');

const API_URL = config.API_OBTENER_CONFIGURACION;
const CLAVE = config.CLAVE;
const USER = config.API_OBTENER_CONFIGURACION_USER;
const PASS = config.API_OBTENER_CONFIGURACION_PASS;

const generarFechaVigencia = async (fechaPedido) => {
    fPedido = new Date(fechaPedido + "Z");
    diasVigencia = await getVigencia();
    fPedido.setDate(fPedido.getDate() + parseInt(diasVigencia));
    return fPedido;
}


const getVigencia = async () => {

    try {
        const result = await axios(
            {
                method: 'post',
                url: API_URL,
                data: {
                    Clave: CLAVE
                },
                auth: {
                    username: USER,
                    password: PASS
                }
            }).then(function (response) {
                const { mensaje } = response.data;
                return mensaje;
            });

        return result;
    } catch {
        throw new Error('Error al consultar la vigencia.', { cause: "08" });
    }

}


module.exports = generarFechaVigencia;