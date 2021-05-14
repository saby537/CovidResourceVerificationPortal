const HttpError = require('../model/http-error');
const client = require('../client.js');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
//const { v4: uuidv4 } = require('uuid');
const signUp = async (req, res, next) => {
	const { username, password, email, city } = req.body;
	let ans;
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return next(new HttpError('Invalid data entry!!', 422));
		}

		console.log(username, email, password, city);

		//	await client.query("delete from user_details where username like 'test%'");

		const response = await client.query(
			`select username,email from user_details where username like '${username}' `
		);
		ans = response.rows;
		if (ans.length > 0) {
			return res.status(401).send({ errors: 'Username is already in use' });
		}
		//		const id = uuidv4();
		const addUserQuery = `Insert into user_details(username,email,password,city_preference) values('${username}','${email}','${password}','${city}')`;
		const addResponse = await client.query(addUserQuery);
		console.log(addResponse);
	} catch (error) {
		console.log(error);
		return next(new HttpError(error, 500));
	}
	const userJWT = jwt.sign(
		{
			username: username,
			email: email,
		},
		process.env.JWT_KEY
	);
	req.session = { jwt: userJWT };
	res.status(200).send({ user: { email, username, city } });
};
module.exports = signUp;
