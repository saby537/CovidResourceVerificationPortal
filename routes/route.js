const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middlewares/checkAuth');
const getRequests = require('../utils/getRequests');
const updateRequests = require('../utils/updateStatus');
const router = express.Router();
router.use(checkAuth);
router.get('/api/requests/:name/:status', getRequests);
router.post(
	'/api/requests',
	[(check('status').not().isEmpty(), check('id').not().isEmpty())],
	updateRequests
);

module.exports = router;
