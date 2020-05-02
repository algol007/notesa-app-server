const Users = require('../models').user;

exports.checkDuplicateEmail = (req, res, next) => {
  Users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(data => {
      if(data) {
        res.status(200).json({
          message: "Email has been registered! Please Login..",
          status: 0
        })
        return;
      }
      next();
    })
}
