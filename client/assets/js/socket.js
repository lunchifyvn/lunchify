$(document).ready(function() {
  if($('.chat-input').length) {
    var socket = io.connect('http://localhost:3000');
    socket.on('connect', function(){
      socket.emit('authentication', {
        id: userInfo.access_token,
        userId: userInfo.id
      });
      socket.on('authenticated', function() {
          // use the socket as usual
          console.log('User is authenticated');
      });
    });
  }
})