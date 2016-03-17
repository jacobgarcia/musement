var socket = io();
var image = $('#image').text();
var username = $('#username').text();

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val(), image, username);
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg, imageUser, userName){
    $('#messages').append('<li><div class="new_message"><div class="who"><img src="' + imageUser + '"/><div class="username_chat">' + userName + '</div> </div><div class="msg">' + msg+'</div></div></li>');
  });
