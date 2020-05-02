module.exports = function(app) {
  const controller = require('../controllers/user');
  const upload = require('../helpers/upload');
  const user = require('../middleware/userVerify');

  app.post('/api/notesa/auth/signup', user.checkDuplicateEmail, controller.signUp);
  app.post('/api/notesa/auth/signin', controller.signIn);
  app.get('/api/notesa/user', controller.getAllUsers);
  app.post('/api/notesa/checkUser', controller.checkUsers)
  app.get('/api/notesa/user/:userId', controller.getUserById);
  app.put('/api/notesa/user/:userId', upload.upload.single('image'), controller.updateUser);
  app.patch('/api/notesa/user/:userId', upload.upload.single('image'), controller.updateUser);
  app.delete('/api/notesa/user/:userId', controller.deleteUser);
};
