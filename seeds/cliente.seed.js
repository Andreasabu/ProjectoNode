const mongoose = require('mongoose');
const db = require('../db');
const Cliente = require('../models/Cliente');

const clientes = [
    { nombre: 'Marta', apellido: 'Perez', edad: 31, destinacion:"Paris", aerolinea: "Vueling" },
    { nombre: 'Andrea', apellido: 'Martinez', edad: 26, destinacion:"NYC", aerolinea: "KLM" },
    { nombre: 'Erica', apellido: 'Sanchez', edad: 23, destinacion:"Lima", aerolinea: "Avianca" },
    { nombre: 'Vanesa', apellido: 'Burgos', edad: 30, destinacion:"Amsterdan", aerolinea: "KLM" },
    { nombre: 'Claudia', apellido: 'de Luis', edad: 21, destinacion:"Lisboa", aerolinea: "Iberia" },
];

const clientesDocuments = clientes.map(cliente => new Cliente(cliente));
db.connectDB()
    .then(async () => {
        const todosLosClientes = await Cliente.find();
        if (todosLosClientes.length > 0) {
            await Cliente.collection.drop();
        }
    })
    .catch(err => console.error(`Error eliminado información de la DB: ${err}`))
    .then(async () => {
        await Cliente.insertMany(clientesDocuments)
    })
    .catch(err => console.error(`Error creando documentos en DB: ${err}`))
    .finally(() => mongoose.disconnect())
