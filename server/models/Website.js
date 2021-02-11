const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Website = mongoose.model('website', WebsiteSchema);

module.exports = Website;
