require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);
// var io = require('socket.io')(server);

// io.on('connection', (socket) => {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', (data) => {
//     console.log(data);
//   });
// });

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });
});

// io.on('connection', () => {
//   console.log('is connection');
// });
// io.on('event', (data) => {
//   console.log('is event');
//   console.log(data);
// });
// io.on('disconnect', () => {
//   console.log('is disconnect');
// });

server.listen(port);
