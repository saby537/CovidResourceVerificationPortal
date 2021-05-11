const logout = async (req, res, next) => {
	req.session = null;
	res.send({});
};
module.exports = logout;
