require('dotenv').config();
const Chats = require('../models').chat;
const Users = require('../models').user;

exports.sendChat = (req, res, next) => {
  Chats
    .create({
      message: req.body.message,
      userId: req.body.userId,
      room: req.body.room
    })
    .then(data => {
      res.status(201).send({
        chat: data,
        message: 'chat has been sent!'
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAllChats = (req, res, next) => {
  Chats.findAndCountAll({
    include: [
      { model: Users, as: "user", attributes: ["id", "name", "email", "image"] },
    ]
  })
    .then(data => {
      res.status(200).send({
        chats: data
      });
    })
};

exports.getChatById = async (req, res, next) => {
  const chatId = req.params.chatId;

  try {
    const chat = await Chats.findOne({
      where: {
        id: chatId
      }
    });
    if (!chat) {
      res.status(200).json({
        message: 'chat not found!',
        status: 0
      });
    }
    else {
      Chats
      .findOne({
        where: {
          id: chatId
        },
      })
      .then(data => {
        res.status(200).send({
          chat: data,
        });
      });
    }
  } catch(error) {
    next(error);
  }
};

exports.getChatRoom = async (req, res, next) => {
  const room = req.params.room;

  try {
    const chat = await Chats.findOne({
      where: {
        room: room
      }
    });
    if (!chat) {
      res.status(200).json({
        message: 'room not found!',
        status: 0
      });
    }
    else {
      Chats
      .findAndCountAll({
        where: {
          room: room
        },
      })
      .then(data => {
        res.status(200).send({
          chat: data,
        });
      });
    }
  } catch(error) {
    next(error);
  }
};

exports.getAllUserChats = async (req, res, next) => {
  const userId = req.params.userId;
  const chatId = req.params.chatId;

  try {
    const chat = await Chats.findOne({
      where: {
        userId: userId
      }
    });
    if (!chat) {
      res.status(200).json({
        message: 'chat not found!',
        status: 0
      });
    }
    else {
      Chats
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
            chat: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};


exports.deleteChat = async (req, res, next) => {
  const chatId = req.params.chatId;

  try {
    const chat = await Chats.findOne({
      where: {
        id: chatId
      }
    });
    if (!chat) {
      res.status(200).json({
        message: 'chat not found!',
        status: 0
      });
    } else {
      Chats
        .destroy({
          where: {
            id: chatId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'chat has been deleted!',
            chat: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};
