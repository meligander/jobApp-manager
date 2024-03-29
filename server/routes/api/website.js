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
		const websites = await Website.find().sort({ date: -1 });

		if (websites.length === 0) {
			return res.status(400).json({
				msg: 'There is no webpage registered',
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
				msg: 'There is no webpage matching that description',
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
		check('name', 'Name is required').not().isEmpty(),
		check('url', 'The URL is required').not().isEmpty(),
	],
	async (req, res) => {
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
					.json({ msg: 'There is an existing website with that name' });

			website = new Website(req.body);

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
		check('name', 'Name is required').not().isEmpty(),
		check('url', 'The URL is required').not().isEmpty(),
	],
	async (req, res) => {
		const { name } = req.body;

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
					.json({ msg: 'There is an existing website with that name' });

			website = await Website.findOneAndUpdate(
				{ _id: req.params.id },
				req.body,
				{
					new: true,
				}
			);

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
