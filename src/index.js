const app = require('./app');
require('./config/database');
const { swaggerDocs } = require('./middlewares/swagger');
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  swaggerDocs(app, PORT);
});
