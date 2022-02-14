const express = require('express');
const Aerolinea = require('../models/Aerolinea');

const aerolineaRouter = express.Router();

aerolineaRouter.get('/', (req, res, next) => {
    return Aerolinea.find()
        .then(aerolineas => {
            return res.status(200).json(aerolineas);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

module.exports = aerolineaRouter;