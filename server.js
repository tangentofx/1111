const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A player connected!');
  socket.on('shoot', (shotData) => {
    socket.broadcast.emit('opponentShot', shotData);
  });
  socket.on('syncBalls', (ballData) => {
    socket.broadcast.emit('syncOpponentBalls', ballData);
  });
});

const listener = http.listen(process.env.PORT || 3000, () => {
  console.log('Your game is running on port ' + listener.address().port);
});