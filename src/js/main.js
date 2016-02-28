var socket = io();
var image = $('#image').text();
var username = $('#username').text();

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append('<li><div class="new_message"><img src="' + image + '"/><div>' + username + '</div> <div class="msg">' + msg+'</div></div></li>');
  });
