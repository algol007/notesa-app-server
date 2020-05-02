const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { handleError } = require('./helpers/error')

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

require('./routers/chat')(app);
require('./routers/map')(app);
require('./routers/user')(app);

// app.use((err, req, res, next) => {
//   handleError(err, res);
// });

module.exports = app;
