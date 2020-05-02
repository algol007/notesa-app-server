require('dotenv').config();
const Users = require('../models').user;
const bcrypt = require('bcryptjs');
const { ErrorHandler } = require('../helpers/error');

exports.signUp = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  Users
    .create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      image: 'http://192.168.1.97:5000/uploads/default-user.jpg',
      phone: req.body.phone,
    })
    .then(data => {
      res.status(201).send({
        user: data,
        message: 'User has been created!'
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.signIn = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      res.status(200).json({
        message: 'You are not registered! Please Signup',
        id: 0
      });
    } else {
      Users
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then(data => {
          if (data) {
            const authorized = bcrypt.compareSync(
              req.body.password,
              data.password
            );
            if (authorized) {
                res.status(200).send({
                  user: data.id,
                  message: 'Login Successfuly!'
                });
              } else {
              res.status(200).json({
                message: 'Wrong Password',
                status: 0
              });
              }
            }
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.getAllUsers = (req, res, next) => {
  Users.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
  })
    .then(data => {
      res.status(200).send({
        users: data
      });
    })
};

exports.checkUsers = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      res.status(200).json({
        message: 'Alhamdulillah',
        status: 1
      });
    } else {
      res.status(200).json({
        message: 'Astagfirullah',
        status: 0
      });
    }
  } catch(error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      res.status(200).json({
        message: 'User not found!',
        status: 0
      });
    }
    else {
      Users
        .findOne({
          where: {
            id: userId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            user: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const salt = await bcrypt.genSaltSync(10);
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
  if (!user) {
    res.status(200).json({
      message: 'User not found!',
      status: 0
    });
  } else {
    if(req.body.password){
      Users
        .update({
          name: req.body.name,
          email: req.body.email,
          password: await bcrypt.hashSync(req.body.password, salt),
          image: `http://192.168.1.97:5000/uploads/${req.file.filename}`,
          phone: req.body.phone,
        },
        {
          where: {
            id: userId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'User has been updated!',
            user: data
          });
        });
      }
    }
  } catch(error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      res.status(200).json({
        message: 'User not found!',
        status: 0
      });
    } else {
      Users
        .destroy({
          where: {
            id: userId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'User has been deleted!',
            user: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};
