const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinacionSchema =  new Schema({
    ciudad: { type: String, required: true},
    pais: { type: String, required: true }
}, {
    timestamps: true
});

    const Destinacion = mongoose.model("Destinacion", destinacionSchema);

    module.exports = Destinacion