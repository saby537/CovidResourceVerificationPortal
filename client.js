const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

const conURL = `${process.env.DATABASE_URL}`;
const client = new Client({
	connectionString: conURL,
	ssl: {
		rejectUnauthorized: false,
	},
});
module.exports = client;
