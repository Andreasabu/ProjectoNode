const mongoose = require('mongoose');
const db = require('../db');
const Aerolinea = require('../models/Aerolinea');

const Aerolineas = [
    { nombre: "Avianca"},
    { nombre: "Vueling"},
    { nombre: "Iberia"},
    { nombre: "KLM"}
]

const aerolineasDocuments = aerolineas.map(aerolinea => new Aerolinea(aerolinea));
db.connectDB()
    .then(async () => {
        const todosLasAerolineas = await Aerolinea.find();
        if (todosLasAerolineas.length > 0) {
            await Aerolinea.collection.drop();
        }
    })
    .catch(err => console.error(`Error eliminado información de la DB: ${err}`))
    .then(async () => {
        await Aerolinea.insertMany(aerolineasDocuments)
    })
    .catch(err => console.error(`Error creando documentos en DB: ${err}`))
    .finally(() => mongoose.disconnect())