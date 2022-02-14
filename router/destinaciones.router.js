const { Router } = require('express');
const express = require('express');
const Destinacion = require('../models/Destinacion');

const destinacionRouter = express.Router();

// destinacionRouter.get('/', (req, res, next) => {
//     return Destinacion.find()
//         .then(destinaciones => {
//             return res.status(200).json(destinaciones);
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.status = 500;
//             return next(error);
//         });
// });
destinacionRouter.get('/', async (req, res, next) => {
	try {
		const destinacion = await Destinacion.find();
		return res.status(200).json(destinacion)
	} catch (error) {
		return next(error)
	}
});

module.exports = destinacionRouter;

