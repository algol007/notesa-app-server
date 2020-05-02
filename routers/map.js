module.exports = function(app) {
  const controller = require('../controllers/map');

  app.post('/api/notesa/map', controller.sendMap);
  app.get('/api/notesa/map', controller.getAllMaps);
  app.get('/api/notesa/map/user/:userId', controller.getAllUserMaps);
  app.get('/api/notesa/map/:mapId', controller.getMapById);
  app.put('/api/notesa/map/:mapId', controller.updateMap);
  app.delete('/api/notesa/map/:mapId', controller.deleteMap);
};
