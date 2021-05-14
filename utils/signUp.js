const HttpError = require('../model/http-error');
const client = require('../client.js');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
	const { username, password } = req.body;
	let ans;
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return next(new HttpError('Invalid data entry!!', 422));
		}
		console.log(username, password);
		const response = await client.query(
			`select username,email from user_details where username like '${username}' and password like '${password}' `
		);
		ans = response.rows;
	} catch (error) {
		console.log(error);
		return next(new HttpError(error, 500));
	}
	console.log(ans.length);
	if (ans.length === 0) {
		res.status(401).send({ errors: 'Invalid Username and Password' });
	} else {
		const userJWT = jwt.sign(
			{
				username: ans[0].username,
				email: ans[0].email,
			},
			process.env.JWT_KEY
		);
		req.session = { jwt: userJWT };
		res.status(200).send({ user: ans });
	}
};
module.exports = login;
