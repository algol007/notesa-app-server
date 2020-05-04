const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { handleError } = require('./helpers/error')
// const Pusher = require('pusher');
//
// const pusher = new Pusher({
//   appId: '992124',
//   key: 'a530e0850998e71b78e4',
//   secret: '46565b0904c781c72615',
//   cluster: 'ap1',
//   encrypted: true
// });
//
// pusher.trigger('my-channel', 'my-event', {
//   "message": "hello world"
// });


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

require('./routers/chat')(app);
require('./routers/map')(app);
require('./routers/user')(app);

// app.get('*', (req, res, next) => {
//   res.send('Hello World!')
// });

module.exports = app;
