const HttpError = require('../model/http-error');
const client = require('../client.js');
const { validationResult } = require('express-validator');

const statusLists = {
	requests: '0',
	tentative: '2',
	accepted: '1',
	rejected: '3',
};

const getRequests = async (req, res, next) => {
	let response;
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return next(new HttpError('Invalid data entry!!', 422));
		}
		const { id, status } = req.body;
		const statusVal = statusLists[status];
		//console.log(id, statusVal);
		response = await client.query(
			`update covid_resource_details set Validation_status = '${statusVal}'  where Id like '${id}'`
		);
		//console.log(response);
	} catch (error) {
		console.log(error);
		return next(new HttpError(error, 500));
	}
	res.status(200).send({ message: 'Update Successful' });
};
module.exports = getRequests;
