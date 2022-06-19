const servicesController = require('../controllers/servicesController');

module.exports = (app) => {
  //# create a service
  app.post('/api/services', servicesController.create);

  //#get the list of services
  app.get('/api/services', servicesController.fetch);

  //#get a single service
  app.get('/api/services/:id', servicesController.get);

  //#update a service
  app.put('/api/services/:id', servicesController.update);

  //#delete a services
  app.delete('/api/services/:id', servicesController.delete);

};