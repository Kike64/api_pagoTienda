
const validarVencimiento = (pago) => {

    let now = new Date();
    let vencimiento = pago.FechaVencimiento > now;

    if (vencimiento) {
        switch (pago.status) {
            case 1:
                return {
                    "Codigo Estatus": "01",
                    "Mensaje": "Referencia Vigente",
                    "Monto": pago.MontoPagar,
                    "URL": pago.URL
                };

            case 2:
                return {
                    "Codigo Estatus": "04",
                    "Mensaje": "Referencia Pagada",
                    "Monto": pago.MontoPagar
                };

            case 4:
                return {
                    "Codigo Estatus": "03",
                    "Mensaje": "Referencia Cancelada",
                    "Monto": pago.MontoPagar
                };
        };

    } else {
        return {
            "Codigo Estatus": "02",
            "Mensaje": "Referencia Vencida",
            "Monto": pago.MontoPagar
        };
    }


};





module.exports = validarVencimiento;