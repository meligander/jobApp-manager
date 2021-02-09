const express = require('express');
const connectDB = require('./config/db');

require('dotenv').config({ path: './config/.env' });

const app = express();

//Connect to the DB
connectDB();

//Middleware
app.use(express.json({ limit: '50mb', extended: false }));

app.use('/api/user', require('./routes/api/user'));

const PORT = process.env.PORT || 5000;

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
