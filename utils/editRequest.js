const HttpError = require('../model/http-error');
const client = require('../client.js');
const { validationResult } = require('express-validator');

const statusLists = {
	requests: '0',
	tentative: '2',
	accepted: '1',
	rejected: '3',
};

const editRequests = async (req, res, next) => {
	let ans = [];
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return next(new HttpError('Invalid data entry!!', 422));
		}
		const {
			id,
			message,
			provider,
			requirement_list,
			city,
			validation_details,
			phone_number,
		} = req.body;
		//console.log(id, message);
		const response = await client.query(
			`update covid_resource_details set provider = '${provider}',message = '${message}', requirement_list = '${requirement_list}', city = '${city}', validation_details = '${validation_details}', phone_number = '${phone_number}' where Id like '${id}'`
		);
		//console.log(response);
	} catch (error) {
		console.log(error);
		return next(new HttpError(error, 500));
	}
	res.status(200).send({ message: 'Update Successful' });
};
module.exports = editRequests;
