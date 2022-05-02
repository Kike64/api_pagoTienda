const axios = require('axios');
const config = require('../config.json');

const API_URL = config.API_REFERENCIAPAGO_URL;

const getReferenciaURL = async (referencia) => {

  try {
    const result = await axios({
      method: 'get',
      url: API_URL,
      data: {
        Referencia: referencia
      }
    }).then(function (response) {
      const { URL } = response.data;
      return URL;
    });

    return result;
  } catch {
    throw new Error('Error al generar la URL de la referencia.', { cause: "07" });
  }

}

module.exports = getReferenciaURL;