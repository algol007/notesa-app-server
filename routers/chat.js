module.exports = function(app) {
  const controller = require('../controllers/chat');

  app.post('/api/notesa/chat', controller.sendChat);
  app.get('/api/notesa/chat', controller.getAllChats);
  app.get('/api/notesa/chat/user/:userId', controller.getAllUserChats);
  app.get('/api/notesa/chat/:chatId', controller.getChatById);
  app.get('/api/notesa/chat/room/:room', controller.getChatRoom);
  app.delete('/api/notesa/chat/:chatId', controller.deleteChat);
};
