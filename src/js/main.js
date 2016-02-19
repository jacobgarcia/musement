var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append('<li><div class="new_message"><img src="/static/assets/img/perfil.jpg"/> <div class="msg">'+msg+'</div></div></li>');
  });
