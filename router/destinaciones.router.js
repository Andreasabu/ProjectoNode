const express = require('express');
const Destinacion = require('../models/Destinacion');

const destinacionesRouter = express.Router();
const destinaciones = [
    { id: 1, ciudad : "Paris", pais: "Francia", anno: 2019, aerolineas: "KLM"},
    { id: 2, ciudad : "NYC", pais: "USA", anno: 2020, aerolineas: "Avianca"},
    { id: 3, ciudad : "Lima", pais: "Peru", anno: 2018, aerolineas: "vueling"},
    { id: 4, ciudad : "Lisboa", pais: "Portugal", anno: 2017, aerolineas: "Iberia"},
    { id: 5, ciudad : "Amberas", pais: "Belgica", anno: 2021, aerolineas: "KLM"},
    { id: 6, ciudad : "Amsterdan", pais: "Holanda", anno: 2016, aerolineas: "Avianca"}
];
// mira el anno en los models, si el coche tambien tiene anno de fab
destinacionesRouter.get('/', (req, res, next) => {
    let filtro = {};
    if (req.query.ciudad) {
        filtro = { ...filtro, ciudad: req.query.ciudad }; //marca
    }
    const anterioresA = Number(req.query.anterioresA);
    const posterioresA = Number(req.query.posterioresA);
    if (!isNaN(anterioresA) && !isNaN(posterioresA)) {
  
        filtro = { ...filtro, anno: { $lt: anterioresA, $gte: posterioresA } };
    } else if (!isNaN(anterioresA)) {
     
        filtro = { ...filtro, anno: { $lt: anterioresA } } // $lt === menor que, $lte === menor o igual que
    } else if (!isNaN(posterioresA)) {
        
        filtro = { ...filtro, anno: { $gte: posterioresA } }; // $gt === mayor que, $gte === mayor o igual que
    }

    console.log('Filtro de /destinaciones', filtro);
    return Destinacion.find(filtro)
        .then(destinacionesLeidas => {
            return res.status(200).json(destinacionesLeidas);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

destinacionesRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return Destinacion.findById(id)
        .then((destinacion) => {
            if (!destinacion) {
                const error = new Error('Destinacion no encontrada');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(destinacion);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

destinacionesRouter.post('/', (req, res, next) => {
    console.log('Body recibido', req.body);
    const nuevaDestinacion = new Destinacion(
        req.body);

        return nuevaDestinacion.save()
        .then(() => {
            return res.status(201).json(nuevaDestinacion);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        }); 
    });

destinacionesRouter.put('/:id', (req, res, next) => {
        const id = req.params.id;
        return Destinacion.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then(destinacionActualizada => {
            return res.status(200).json(destinacionActualizada);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

destinacionesRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return Destinacion.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Destinacion con id ${id} eliminada`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

module.exports = destinacionesRouter;

