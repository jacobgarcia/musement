var socket = io();
var image = $('#image').text();
var username = $('#username').text();

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append('<li><div class="new_message"><div class="who"><img src="' + image + '"/><div class="username_chat">' + username + '</div> </div><div class="msg">' + msg+'</div></div></li>');
  });
