const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

//Models
const Website = require('../../models/Website');

//@route    GET /api/website
//@desc     get all websites
//@access   Public
router.get('/', async (req, res) => {
	try {
		const websites = await Website.find();

		if (websites.length === 0) {
			return res.status(400).json({
				msg: 'No se encontraron sitios web con dichas descripciones',
			});
		}

		res.json(websites);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

//@route    GET /api/website/:id
//@desc     get one website
//@access   Public
router.get('/:id', async (req, res) => {
	try {
		let webiste = await webiste.findOne({ _id: req.params.id });

		if (!webiste)
			return res.status(400).json({
				msg: 'No se encontraró un sitio web con dichas descripciones',
			});

		res.json(webiste);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

//@route    POST /api/website
//@desc     Add a website
//@access   Public
router.post(
	'/',
	[
		check('name', 'El nombre es necesario.').not().isEmpty(),
		check('url', 'La dirección web es necesaria.').not().isEmpty(),
	],
	async (req, res) => {
		const { name, url } = req.body;

		let errors = [];
		const errorsResult = validationResult(req);
		if (!errorsResult.isEmpty()) {
			errors = errorsResult.array();
			return res.status(400).json({ errors });
		}

		try {
			let website = await Website.findOne({ name });
			if (website)
				return res
					.status(400)
					.json({ msg: 'Ya existe un sitio web con ese nombre' });

			const data = { name, url };

			website = new Website(data);

			await website.save();

			res.json(website);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

//@route    PUT /api/website/:id
//@desc     Update a website
//@access   Public
router.put(
	'/:id',
	[
		check('name', 'El nombre es necesario.').not().isEmpty(),
		check('url', 'La dirección web es necesaria.').not().isEmpty(),
	],
	async (req, res) => {
		const { name, url } = req.body;

		let errors = [];
		const errorsResult = validationResult(req);
		if (!errorsResult.isEmpty()) {
			errors = errorsResult.array();
			return res.status(400).json({ errors });
		}

		try {
			let website = await Website.findOne({
				_id: { $ne: req.params.id },
				name,
			});
			if (website)
				return res
					.status(400)
					.json({ msg: 'Ya existe un sitio web con ese nombre' });

			const data = { name, url };

			website = await Website.findOneAndUpdate({ _id: req.params.id }, data, {
				new: true,
			});

			res.json(website);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

//@route    DELETE /api/website/:id
//@desc     Delete a website
//@access   Public
router.delete('/:id', async (req, res) => {
	try {
		//Remove website
		await Website.findOneAndRemove({
			_id: req.params.id,
		});

		res.json({ msg: 'Website deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
