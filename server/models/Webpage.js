const mongoose = require('mongoose');

const WebpageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
});

const Webpage = mongoose.model('webpage', WebpageSchema);

module.exports = Webpage;
