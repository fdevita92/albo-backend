const engController = require('../controllers/engController');

module.exports = (app) => {
  //# create a note
  app.post('/api/engs', engController.create);

  //#get the list of notes
  app.get('/api/engs', engController.fetch);

  //#get a single note
  app.get('/api/engs/:id', engController.get);

  //#update a note
  app.put('/api/engs/:id', engController.update);

  //#delete a note
  app.delete('/api/engs/:id', engController.delete);

};
