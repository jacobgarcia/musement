const socketio   = require('socket.io');

module.exports.listen = function(server){
    io = socketio.listen(server)
    console.log('Connected ${socket.id}');

    io.on('connection', function (socket){
      socket.on('chat message', function(msg, imageUser, userName){
        io.emit('chat message', msg, imageUser, userName);
      });

    });

    return io;
}
