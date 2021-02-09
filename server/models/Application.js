const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
	website: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'website',
		required: true,
	},
	letter: {
		type: String,
	},
	date: {
		type: date,
		default: Date.now,
	},
});

const Application = mongoose.model('application', ApplicationSchema);

module.exports = Application;
