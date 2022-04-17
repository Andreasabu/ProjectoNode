const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema =  new Schema({
        nombre: { type: String, required: true},
        apellido: { type: String, required: true },
        edad: { type: Number }, 
        destinaciones: [{ type: mongoose.Types.ObjectId, ref: 'Destinacion'}],
        // aerolinea: { type: String, required: true }
    }, {
        timestamps: true
    });

    const Cliente = mongoose.model("Cliente", clienteSchema);

    module.exports = Cliente;