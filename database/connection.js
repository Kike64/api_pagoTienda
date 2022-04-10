const sql = require('mssql');

const dbSettings = {
    user: 'kike',
    password: 'contra',
    server: 'localhost',
    database: 'Apartado_Central',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}


async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
        return {
            "Codigo Estatus": 4,
            "mensaje": "No fue posible la conexión"
        };
    }

}
