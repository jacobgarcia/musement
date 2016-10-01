const socketio   = require('socket.io');

module.exports.listen = function(server){
    io = socketio.listen(server);

    io.on('connection', function (socket){
          console.log('Connected ${socket.id}');
      socket.on('chat message', function(msg, imageUser, userName){
        io.emit('chat message', msg, imageUser, userName);
      });

      socket.on('ping', function(){
          socket.emit("pong");
      });

    });




    return io;
}
