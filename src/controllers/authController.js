const User = require('../models/User');
var sha256 = require('js-sha256').sha256;


module.exports = {

  login: async (request, reply) => {
    try {
        username = request.body.username;
        password = request.body.password;
        var hash = sha256(password);

        const user = await User.find().and([{"username":username},{"password":hash}]);
        if(user.length > 0){
            reply.code(200).send({"username":username});
        }else{
            reply.code(401).send();
        }
    } catch (e) {
      reply.code(500).send(e);
    }
  },

};
