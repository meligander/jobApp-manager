const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

//Models
const Application = require('../../models/Application');

//@route    GET /api/application
//@desc     get all applications | with filter
//@access   Public
router.get('/', async (req, res) => {
	try {
		let applications = [];

		if (Object.entries(req.query).length === 0) {
			applications = await Application.find();
		} else {
			let filter = {
				...((req.query.startDate || req.query.endDate) && {
					date: {
						...(req.query.startDate && {
							$gte: new Date(req.query.startDate).setHours(00, 00, 00),
						}),
						...(req.query.endDate && {
							$lte: new Date(req.query.endDate).setHours(23, 59, 59),
						}),
					},
				}),
				...(req.query.website && {
					website: req.query.website,
				}),
				...(req.query.company && {
					company: { $regex: `.*${req.query.company}.*`, $options: 'i' },
				}),
			};

			applications = await Application.find(filter);
		}

		if (applications.length === 0) {
			return res.status(400).json({
				msg: 'No se encontraron aplicaciones con dichas descripciones',
			});
		}

		res.json(applications);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

//@route    GET /api/application/:id
//@desc     get one application
//@access   Public
router.get('/:id', async (req, res) => {
	try {
		let application = await Application.findOne({ _id: req.params.id });

		if (!application)
			return res.status(400).json({
				msg: 'No se encontraró una aplicación con dichas descripciones',
			});

		res.json(application);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

//@route    POST /api/application
//@desc     Add an application
//@access   Public
router.post(
	'/',
	[
		check('website', 'El sitio web es necesario.').not().isEmpty(),
		check('company', 'El nombre de la empresa es necesario.').not().isEmpty(),
	],
	async (req, res) => {
		const { website, company, letter, date } = req.body;

		let errors = [];
		const errorsResult = validationResult(req);
		if (!errorsResult.isEmpty()) {
			errors = errorsResult.array();
			return res.status(400).json({ errors });
		}

		try {
			const data = { website, company, letter, date };

			application = new Application(data);

			await application.save();

			res.json(application);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

//@route    PUT /api/application/:id
//@desc     Update an application
//@access   Public
router.put(
	'/:id',
	[
		check('website', 'El sitio web es necesario.').not().isEmpty(),
		check('company', 'El nombre de la empresa es necesario.').not().isEmpty(),
	],
	async (req, res) => {
		const { website, company, letter, date } = req.body;

		let errors = [];
		const errorsResult = validationResult(req);
		if (!errorsResult.isEmpty()) {
			errors = errorsResult.array();
			return res.status(400).json({ errors });
		}

		try {
			const data = { website, company, letter, date };

			const application = await Application.findOneAndUpdate(
				{ _id: req.params.id },
				data,
				{
					new: true,
				}
			);

			res.json(application);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server Error');
		}
	}
);

//@route    DELETE /api/application/:id
//@desc     Delete an application
//@access   Public
router.delete('/:id', async (req, res) => {
	try {
		//Remove Application
		await Application.findOneAndRemove({
			_id: req.params.id,
		});

		res.json({ msg: 'Application deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
