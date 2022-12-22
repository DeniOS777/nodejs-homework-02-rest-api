const path = require('path');
const multer = require('multer');

const tempDir = path.join(__dirname, '../', 'temp');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2097152,
  },
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length']);

    if (fileSize > 2097152) {
      const error = new Error();
      error.status = 400;
      error.message = 'The file must be no more than 2Mb';
      return cb(error);
    }
    cb(null, true);
  },
});

module.exports = upload;
