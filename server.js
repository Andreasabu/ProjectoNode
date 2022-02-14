const express = require("express");
const db = require('./db');

const clientesRouter = require('./router/clientes.router');
const aerolineaRouter = require('./router/aerolineas.router');
const destinacionRouter = require('./router/destinaciones.router');

const  PORT = 3000;
const server = express();

server.use('/clientes', clientesRouter);
server.use('/aerolineas', aerolineaRouter);
server.use('/destinaciones', destinacionRouter);


server.get('/', (req, res) => {
    res.status(200).send('Server is up & running');
});

server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    return next(error);
});

server.use((err, _req, res, _next) => {
    return res
        .status(err.status || 500)
        .json(err.message || 'Error inesperado en servidor');
});

db.connectDB().then(() => {
    console.log('Conectado a base de datos Mongo');
    server.listen(PORT, () => {
        console.log(`Iniciado servidor express en puerto ${PORT}`);
    });
});
