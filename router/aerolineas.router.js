const express = require('express');
const Aerolinea = require('../models/Aerolinea');

const aerolineasRouter = express.Router();

aerolineasRouter.get('/', (req, res, next) => {
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

aerolineasRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return Aerolinea.findById(id).populate('clientes')
        .then((cliente) => {
            if (!cliente) {
                const error = new Error('Empleado no encontrado');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(cliente);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

aerolineasRouter.post('/', (req, res, next) => {
    const nuevaAerolinea = new Empleado({
        nombre: req.body.nombre,
        destinacion: req.body.destinacion,
        // clientes: [],
        flota: req.body.flota,
    })
    return nuevaAerolinea.save()
        .then(() => {
            return res.status(201).json(nuevaAerolinea);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

// /:id/clientes

aerolineasRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return Aerolinea.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Aerolinea con id ${id} eliminada`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});


module.exports = aerolineasRouter;