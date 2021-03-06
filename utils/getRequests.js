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
	let ans = [];
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return next(new HttpError('Invalid data entry!!', 422));
		}
		const { name, status, filter } = req.body;
		const statusVal = statusLists[status];
		let valName = "Validated_by::text like '" + name + "'";
		if (statusVal === '0') {
			valName = 'Validated_by is NULL or ' + valName;
		}
		let valStatus = "Validation_status like '" + statusVal + "'";
		if (statusVal === '0') {
			valStatus = 'Validation_status is NULL or ' + valStatus;
		}
		//console.log(valName, valStatus);
		let filterStatement = '';
		if (filter != '' && statusVal === '0') {
			const { city, requirement } = filter;

			if (city !== '') {
				filterStatement =
					filterStatement + "AND city like '%" + city.toLowerCase() + "%' ";
			}
			if (requirement !== '' && requirement) {
				filterStatement =
					filterStatement +
					"AND requirement_list like '%" +
					requirement.toLowerCase() +
					"%' ";
			}
		}
		console.log('filter', filterStatement);
		ans = await client.query(
			`select id,Time,Message,Provider,Validation_status,Validation_details,Source,City,Requirement_list,Phone_number from covid_resource_details where (${valName}) and (${valStatus}) and City is not NULL and Requirement_list is not NULL and Phone_number is not NULL ${filterStatement} ORDER BY Validation_status,Time DESC limit 10 `
		);

		if (statusVal === '0') {
			let ids = '';
			ans.rows.forEach((element) => {
				ids += "'" + element.id + "', ";
			});
			ids = ids.substr(0, ids.length - 2);
			//console.log(ids);
			const date = new Date();
			const timeTweet =
				date.getFullYear() +
				'-' +
				(date.getMonth() + 1) +
				'-' +
				date.getDate() +
				' ' +
				date.getHours() +
				':' +
				date.getMinutes() +
				':' +
				date.getSeconds();
			//console.log(timeTweet);
			const res = await client.query(
				`update covid_resource_details set Validation_status = '0',Validated_at = '${timeTweet}',Validated_by = '${name}' where Id in (${ids})`
			);
			//console.log(res);
		}

		//`	console.log(ans);
	} catch (error) {
		console.log(error);
		return next(new HttpError(error, 500));
	}
	console.log(ans.rows.length);
	res.status(200).send({ resources: ans.rows });
};
module.exports = getRequests;
