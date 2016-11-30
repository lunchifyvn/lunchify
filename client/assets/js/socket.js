$(document).ready(function() {
  //  demo
  var $chatInput = $("#chatInput");

  $chatInput.keyup(function(event){
    var _this = $(this);
    if(event.which == 13){

      var message = _this.val(),
        removeWhitespace = message.replace(/ /g,''),
        currentTime = new Date().toString("hh:mm tt");

      //  check empty
      if(removeWhitespace == ""){
        return false;
      }

      //  submit and input to chat box
      var chatItem = '<li class="mar-btm">'
        +'<div class="media-right"><img src="https://fb-s-c-a.akamaihd.net/h-ak-xpt1/v/t1.0-1/p160x160/14102579_1430088513673052_7144869259414944101_n.jpg?oh=d1de2b94ac3268db6d90e82dfa0bcd5c&amp;oe=58B7A6B1&amp;__gda__=1488922554_40747e6d2436052a754a5611f9e51477" alt="Profile Picture" class="img-circle img-sm"></div>'
        +'<div class="media-body pad-hor speech-right">'
        +'<div class="speech"><a href="#" class="media-heading">Tuan Nguyen</a>'
        +'<p>'+message+'</p>'
        +'<p class="speech-time"><i class="fa fa-clock-o fa-fw"></i> '+currentTime+'</p>'
        +'</div>'
        +'</div>'
        +'</li>';

      //  add to chat box
      $("#demoChatBody .media-block").append(chatItem);
      //  remove text
      _this.val("");

      //  reply
      if(message.length < 10){
        return false;
      }else{
        setTimeout(function(){
          var newTime = new Date().toString("hh:mm tt");
          var newMessage = 'good for me also, how about The Journal Coffee, I am a member with 30% discount';

          if(message.indexOf("see you") != -1){
            newMessage = 'ok, see you there :)';
          }

          var replyContent = '<li class="mar-btm">'
            +'<div class="media-left"><img src="https://fb-s-d-a.akamaihd.net/h-ak-xft1/v/t1.0-1/p160x160/996693_2116007291873744_1764555311648855641_n.jpg?oh=846b9c00fc80808b6f505c685c84d8c1&oe=58B81462&__gda__=1489197048_f191b063da43b1f5d8118edcf45ed92e" class="img-circle img-sm"></div>'
            +'<div class="media-body pad-hor speech-left">'
            +'<div class="speech"><a href="#" class="media-heading">Vi Trần</a>'
            +'<p>'+newMessage+'</p>'
            +'<p class="speech-time"><i class="fa fa-clock-o fa-fw"></i> '+newTime+'</p>'
            +'</div>'
            +'</div>'
            +'</li>';

          $("#demoChatBody .media-block").append(replyContent);
          $("#demoChatBody .nano-content").scrollTop(10000);
        },3000);
        $("#demoChatBody .nano-content").scrollTop(10000);
      }
    }

  });


  if($chatInput.length) {
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
});
