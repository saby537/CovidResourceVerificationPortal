const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middlewares/checkAuth');
const getRequests = require('../utils/getRequests');
const updateRequests = require('../utils/updateStatus');
const editRequests = require('../utils/editRequest');
const login = require('../utils/login');
const logout = require('../utils/logout');
const router = express.Router();
router.use(checkAuth);
router.get('/api/requests/:name/:status', getRequests);
router.post(
	'/api/requests',
	[(check('status').not().isEmpty(), check('id').not().isEmpty())],
	updateRequests
);
router.post(
	'/api/login',
	[(check('username').not().isEmpty(), check('password').not().isEmpty())],
	login
);
router.post(
	'/api/requests/edit',
	[(check('message').not().isEmpty(), check('id').not().isEmpty())],
	editRequests
);
router.post('/api/logout', logout);

module.exports = router;
