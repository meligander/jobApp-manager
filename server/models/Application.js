const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
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
	date: {
		type: Date,
		default: Date.now,
	},
});

const Application = mongoose.model('application', ApplicationSchema);

module.exports = Application;
