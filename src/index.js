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



app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});
