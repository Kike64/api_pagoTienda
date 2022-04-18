require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.API_OBTENER_CONFIGURACION;
const CLAVE = process.env.CLAVE;
const USER = process.env.AUTH_USER;
const PASS = process.env.AUTH_PASS;

const generarFechaVigencia = async (fechaPedido) => {
    fPedido = new Date(fechaPedido + "Z");
    diasVigencia = await getVigencia();
    console.log(fPedido)
    console.log(diasVigencia)
    fPedido.setDate(fPedido.getDate() + parseInt(diasVigencia));
    console.log(fPedido)
    return fPedido;
}


const getVigencia = async () => {

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
}


module.exports = generarFechaVigencia;