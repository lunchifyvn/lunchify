$(document).ready(function() {
  //  demo
  var $chatInput = $("#chatInput");

  //  get event id from url
  var eventId = getParameterByName("event");
  var chatRequestUri = '/api/events/'+eventId+'/chats';
  console.log(eventId);

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

      //  post api
      api(chatRequestUri,{
        data: JSON.stringify({from:userInfo.id, text: message}),
        success: function(response){
          console.log(response);
        }
      }).post()
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

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
