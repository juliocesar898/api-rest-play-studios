const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { config } = require('dotenv');
const { router } = require('./routes');
const { errorHandler } = require('./errors/index');

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', router);

app.use(errorHandler);

module.exports = app;
