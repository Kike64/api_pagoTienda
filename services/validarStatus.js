
const validarStatus = async (pago, body) => {

    let result;

    switch (pago.status) {
        case 1:

            switch (body.status) {
                case 2:
                    await pago.update(body);

                    result = {
                        "CodigoEstatus": "01",
                        "Mensaje": "Estatus actualizado a pagado correctamente",
                        "Monto": pago.MontoPagar
                    };
                    break;

                case 3:
                    await pago.update(body);
                    result = {
                        "CodigoEstatus": "01",
                        "Mensaje": "Estatus actualizado a completado correctamente",
                        "Monto": pago.MontoPagar
                    };
                    break;
                case 4:
                    await pago.update(body);
                    result = {
                        "CodigoEstatus": "01",
                        "Mensaje": "Estatus actualizado a cancelado correctamente",
                        "Monto": pago.MontoPagar
                    };
                    break;
                case 5:
                    await pago.update(body);
                    result = {
                        "CodigoEstatus": "01",
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
                "CodigoEstatus": "04",
                "Mensaje": "El estatus ya se encuentra como pagado",
                "Monto": pago.MontoPagar
            };
            break;
        case 4:
            result = {
                "CodigoEstatus": "03",
                "Mensaje": "El estatus se encuentra cancelado",
                "Monto": pago.MontoPagar
            };
            break;
        default:
            result = { "mensaje": `status ${pago.status}` };
    };

    return result;

};



module.exports = validarStatus;