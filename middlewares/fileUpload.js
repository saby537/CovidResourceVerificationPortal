const multer = require('multer');
const { v4: uuid } = require('uuid');

const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg',
	'application/pdf': 'pdf',
};
const resumeUpload = multer({
	limits: 500000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/resume');
		},
		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
			cb(null, req.body.email + '-' + uuid() + '.' + ext);
		},
	}),
	fileFilter: (req, file, cb) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		let error = isValid ? null : new Error('Invalid File Type');
		cb(error, isValid);
	},
});
const supplierUpload = multer({
	limits: 500000000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/supplier');
		},
		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
			cb(null, req.body.email + '-' + uuid() + '.' + ext);
		},
	}),
	fileFilter: (req, file, cb) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		let error = isValid ? null : new Error('Invalid File Type');
		cb(error, isValid);
	},
});
const brandUpload = multer({
	limits: 500000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/brand');
		},
		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
			cb(null, req.body.email + '-' + uuid() + '.' + ext);
		},
	}),
	fileFilter: (req, file, cb) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		let error = isValid ? null : new Error('Invalid File Type');
		cb(error, isValid);
	},
});

module.exports = { resumeUpload, brandUpload, supplierUpload };
