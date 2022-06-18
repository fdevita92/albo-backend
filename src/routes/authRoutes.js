const authController = require('../controllers/authController');

module.exports = (app) => {

  app.post('/api/login', authController.login);

};
