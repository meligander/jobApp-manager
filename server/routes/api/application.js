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
			applications = await Application.find().sort({ date: -1 });
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

			applications = await Application.find(filter).sort({ date: -1 });
		}

		if (applications.length === 0) {
			return res.status(400).json({
				msg: 'There is no application matching that description',
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
router.get('/lastweek', async (req, res) => {
	try {
		let target = 1; // Monday
		let date = new Date();
		date.setHours(00, 00, 00);

		if (date.getDay() !== target) {
			date.setDate(
				date.getDate() -
					(date.getDay() == target ? 7 : (date.getDay() + (7 - target)) % 7)
			);
		}

		let applications = await Application.find({ date: { $gte: date } });

		res.json(applications.length);
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
				msg: 'There is no application matching that description',
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
		check('website', 'The website is required').not().isEmpty(),
		check('company', 'The company name is required').not().isEmpty(),
	],
	async (req, res) => {
		let errors = [];
		const errorsResult = validationResult(req);
		if (!errorsResult.isEmpty()) {
			errors = errorsResult.array();
			return res.status(400).json({ errors });
		}

		try {
			let last = await Application.find().sort({ $natural: -1 }).limit(1);
			last = last[0];

			let number = 1;
			if (last) number = last.number++;

			const application = new Application({ ...req.body, number });

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
		check('website', 'The website is required').not().isEmpty(),
		check('company', 'The company name is required').not().isEmpty(),
	],
	async (req, res) => {
		let errors = [];
		const errorsResult = validationResult(req);
		if (!errorsResult.isEmpty()) {
			errors = errorsResult.array();
			return res.status(400).json({ errors });
		}

		try {
			const application = await Application.findOneAndUpdate(
				{ _id: req.params.id },
				req.body,
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
