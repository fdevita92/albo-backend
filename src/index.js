const fastify = require('fastify');
const app = fastify();
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');
const supplyRoutes = require('./routes/supplyRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const engRoutes = require('./routes/engRoutes');

const contentRangeHook = require('./hooks/contentRangeHook');

const dotenv = require('dotenv');

dotenv.config();


/*app.register(require('@fastify/cors'), { 
  
})*/

app.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'content-range', 'x-content-range'],
      exposedHeaders: ['content-range', 'x-content-range'],
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
    };

    // do not include CORS headers for requests from localhost
    // if (/^localhost$/m.test(req.headers.origin)) {
    //   corsOptions.origin = false
    // }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})


try {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.error(e);
}

app.addHook('preHandler', contentRangeHook);

noteRoutes(app);
authRoutes(app);
supplyRoutes(app);
servicesRoutes(app);
engRoutes(app);



app.listen(5000,'0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});
