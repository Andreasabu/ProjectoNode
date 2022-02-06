const mongoose = require('mongoose');
const db = require('../db');
const Destinacion = require('../models/Destinacion');

const Destinaciones = [
    { ciudad : "Paris", pais: "Francia"},
    { ciudad : "NYC", pais: "USA"},
    { ciudad : "Lima", pais: "Peru"},
    { ciudad : "Lisboa", pais: "Portugal"},
    { ciudad : "Amberas", pais: "Belgica"},
    { ciudad : "Amsterdan", pais: "Holanda"}
]

const destinacionDocuments = destinacion.map(destinacion => new Destinacion(destinacion));
db.connectDB()
    .then(async () => {
        const todosLasDestinaciones = await Destinacion.find();
        if (todosLasDestinaciones.length > 0) {
            await Destinacion.collection.drop();
        }
    })
    .catch(err => console.error(`Error eliminado información de la DB: ${err}`))
    .then(async () => {
        await Destinacion.insertMany(destinacionDocuments)
    })
    .catch(err => console.error(`Error creando documentos en DB: ${err}`))
    .finally(() => mongoose.disconnect())
