const HttpError = require('../model/http-error');
module.exports = (req, res, next) => {
	//console.log(req);
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		// const token = req.headers.authorization.split(' ')[1];
		// if (!token) {
		// 	throw new Error('Failed!!');
		// }

		// const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		// req.userData = { userId: decodedToken.userID };
		next();
	} catch (err) {
		return next(new HttpError('Authentication Failed!!', 403));
	}
};
