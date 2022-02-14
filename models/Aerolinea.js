const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aerolineaSchema =  new Schema({
        nombre: { type: String, required: true},
        destinacion: { type: String }
       
    }, {
        timestamps: true
    });

    const Aerolinea = mongoose.model("Aerolinea", aerolineaSchema);

    module.exports = Aerolinea;