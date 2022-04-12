const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const Pago = db.define('Bitacora_PagosTiendaWEB', {
    id_cliente: {
        type: DataTypes.STRING
    },
    referencia: {
        type: DataTypes.STRING
    },
    pedido: {
        type: DataTypes.STRING
    },
    FechaPedido: {
        type: DataTypes.DATE
    },
    FechaVencimiento: {
        type: DataTypes.DATE,
        get() {
            return this.getDataValue('FechaVencimiento');
        }
    },
    MontoPagar: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('MontoPagar');
        }
    },
    tipoPago: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.INTEGER,
        get() {
            return this.getDataValue('status');
        }
    },
    FechaActualizacion: {
        type: DataTypes.DATE
    },
    Sucursal: {
        type: DataTypes.INTEGER
    },
    Caja: {
        type: DataTypes.INTEGER
    },
    Cajero: {
        type: DataTypes.INTEGER
    },
    Transaccion: {
        type: DataTypes.INTEGER
    },
    Correo: {
        type: DataTypes.STRING
    },
    URL: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('URL');
        }
    },
    Id_aplicacion: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
}
);

module.exports = Pago;