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
});

const Website = mongoose.model('website', WebsiteSchema);

module.exports = Website;
