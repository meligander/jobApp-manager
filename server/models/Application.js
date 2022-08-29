const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
	number: {
		type: Number,
		required: true,
	},
	website: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'website',
		required: true,
	},
	company: {
		type: String,
		require: true,
	},
	letter: {
		type: String,
	},
	answered: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Application = mongoose.model('application', ApplicationSchema);

module.exports = Application;
