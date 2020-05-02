const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(res, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  },
});

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
});
