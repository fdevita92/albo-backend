const suppliesController = require('../controllers/suppliesController');

module.exports = (app) => {
  //# create a supply
  app.post('/api/supplies', suppliesController.create);

  //#get the list of supplies
  app.get('/api/supplies', suppliesController.fetch);

  //#get a single supply
  app.get('/api/supplies/:id', suppliesController.get);

  //#update a supply
  app.put('/api/supplies/:id', suppliesController.update);

  //#delete a supply
  app.delete('/api/supplies/:id', suppliesController.delete);

};