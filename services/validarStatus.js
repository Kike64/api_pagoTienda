
const validarStatus = async (pago, body) => {

    let result;

    switch (pago.status) {
        case 1:

            switch (body.status) {
                case 2:
                    await pago.update(body);

                    result = {
                        "Codigo Estatus": "01",
                        "Mensaje": "Estatus actualizado a pagado correctamente",
                        "Monto": pago.MontoPagar
                    };
                    break;

                case 3:
                    await pago.update(body);
                    result = {
                        "Codigo Estatus": "01",
                        "Mensaje": "Estatus actualizado a completado correctamente",
                        "Monto": pago.MontoPagar
                    };
                    break;
                case 4:
                    await pago.update(body);
                    result = {
                        "Codigo Estatus": "01",
                        "Mensaje": "Estatus actualizado a cancelado correctamente",
                        "Monto": pago.MontoPagar
                    };
                    break;
                case 5:
                    await pago.update(body);
                    result = {
                        "Codigo Estatus": "01",
                        "Mensaje": "Estatus actualizado a vencido correctamente",
                        "Monto": pago.MontoPagar
                    };
                    break
                default:
                    result = {
                        "mensaje": "Error de actualizacion"
                    };
            }
            break;

        case 2:
            result = {
                "Codigo Estatus": "02",
                "Mensaje": "El estatus ya se encuentra como pagado",
                "Monto": pago.MontoPagar
            };
            break;
        case 4:
            result = {
                "Codigo Estatus": "03",
                "Mensaje": "El estatus estaba como cancelado",
                "Monto": pago.MontoPagar
            };
            break;
        default:
            result ={ "mensaje": `status ${pago.status}` };
    };

    return result;

};





module.exports = validarStatus;