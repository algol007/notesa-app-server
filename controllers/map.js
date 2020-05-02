require('dotenv').config();
const Maps = require('../models').map;
const Users = require('../models').user;

exports.sendMap = (req, res, next) => {
  Maps
    .create({
      long: req.body.long,
      lat: req.body.lat,
      userId: req.body.userId,
    })
    .then(data => {
      res.status(201).send({
        map: data,
        message: 'map has been sent!'
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAllMaps = (req, res, next) => {
  Maps.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Users, as: "user", attributes: ["id", "name", "email", "image"] },
    ]
  })
    .then(data => {
      res.status(200).send({
        maps: data
      });
    })
};

exports.getMapById = async (req, res, next) => {
  const mapId = req.params.mapId;

  try {
    const map = await Maps.findOne({
      where: {
        id: mapId
      }
    });
    if (!map) {
      res.status(200).json({
        message: 'map not found!',
        status: 0
      });
    }
    else {
      Maps
        .findOne({
          where: {
            id: mapId
          },
          exclude: ["createdAt", "updatedAt"],
          include: [
            { model: Users, as: "user", attributes: ["id", "name", "email", "image"] },
          ]
        })
        .then(data => {
          res.status(200).send({
            map: data,
          });
        });
    }
  } catch(error) {
  }
  next(error);
};

exports.getAllUserMaps = async (req, res, next) => {
  const userId = req.params.userId;
  const mapId = req.params.mapId;

  try {
    const map = await Maps.findOne({
      where: {
        userId: userId
      }
    });
    if (!map) {
      res.status(200).json({
        message: 'chat not found!',
        status: 0
      });
    }
    else {
      Maps
        .findAndCountAll({
          where: {
            userId: userId
          },
          include: [
            { model: Users, as: "user", attributes: ["id", "name", "email", "image"] },
          ]
        })
        .then(data => {
          res.status(200).send({
            map: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateMap = (req, res, next) => {
  const mapId = req.params.mapId;

  const map = Maps.findOne({
    id: mapId
  });
  if (!map) {
    res.status(200).json({
      message: 'map not found!',
      status: 0
    });
  } else {
    Maps
      .update({
        long: req.body.long,
        lat: req.body.lat,
        userId: req.body.userId,
      },
      {
        where: {
          id: mapId
        }
      })
      .then(data => {
        res.status(200).send({
          message: 'map has been updated!',
          map: data
        });
      });
    }
};

exports.deleteMap = async (req, res, next) => {
  const mapId = req.params.mapId;

  try {
    const map = await Maps.findOne({
      where: {
        id: mapId
      }
    });
    if (!map) {
      res.status(200).json({
        message: 'map not found!',
        status: 0
      });
    } else {
      Maps
        .destroy({
          where: {
            id: mapId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'map has been deleted!',
            map: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};
