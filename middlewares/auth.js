const config = require('../config.json');

const USER = config.AUTH_USER;
const PASS = config.AUTH_PASS;

async function basicAuth(req, res, next) {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Credenciales de autenticacion invalidas' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    if (username != USER || password != PASS ) {
        return res.status(401).json({ message: 'Credenciales de autenticacion invalidas' });
    }


    next();
}

module.exports = basicAuth;