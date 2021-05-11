const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const client = require('./client.js');
const router = require('./routes/route');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

const app = express();
const port = process.env.PORT || 5000;
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	})
);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content-Type,Accept,Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	next();
});

app.get('/service-worker.js', (req, res) => {
	console.log('Testing service worker');
	res.sendFile(path.resolve(__dirname, 'client/build', 'service-worker.js'));
});
app.use(router);
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	console.log('Production');
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	console.log(error);
	res
		.status(error.code || 500)
		.send({ message: 'An Unknown error has occurred!!' });
});

const start = async () => {
	await client
		.connect()
		.then((data) => console.log('Connected to Database'))
		.catch((e) => {
			console.log(e);
		});
	app.listen(port, (error) => {
		if (error) throw error;
		console.log('Server running on port ' + port);
	});
};

start();
