require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.API_REFERENCIAPAGO_URL;

const getReferenciaURL = async (referencia) => {
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
}

module.exports = getReferenciaURL;