$(document).ready(function() {
  //  user info
  var usersChat = {
    left: {},
    right: {}
  };

  //  input
  var $chatInput = $("#chatInput");

  //  get event id from url
  var eventId = getParameterByName("event");
  var chatRequestUri = '/api/events/'+eventId+'/chats';
  var $listBoxChat = $("#demoChatBody .media-block").empty();

  //  get all chat history to fill in chatbox
  var localChatData = [];

  api(chatRequestUri, {
    success: function (response) {
      if(response.length > 0){
        for(var i=0, l=response.length; i<l; i++){
          var firstItem = response[i];
          if(firstItem.from == userInfo.id){
            usersChat.right = {name: userInfo.name, avatar: userInfo.avatar};
          }else{
            api('/api/users/' + firstItem.from + '/identities', {
              success: function (response) {
                if (response.length > 0) {
                  var userDetail = response[0];
                  var profile = userDetail.profile;
                  usersChat.left = {name: profile.name.familyName + " " + profile.name.givenName, avatar: "https://graph.facebook.com/"+profile.id+"/picture?width=100&height=100"};
                  pollChat();
                }
              }
            }).get();
          }
        }
      }
    }
  }).get();


  function pollChat(){
    setTimeout(function(){
      api(chatRequestUri, {
        success: function (response) {
          var length = response.length;
          if(length > 0 && length > localChatData.length){
            //  check new item
            for(var j=localChatData.length; j<length; j++){
              var currentTime = new Date(response[j].createdAt).toString("hh:mm tt");

              var position = 'right';
              if(response[j].from != userInfo.id){
                position = 'left';
              }

              //  check user exist
              if($.isEmptyObject(usersChat[position])){
                //  get user info
                api('/api/users/' + response[j].from+ '/identities', {
                  success: function (response) {
                    if (response.length > 0) {
                      var userDetail = response[0];

                      //  add to user chat para
                      usersChat[position] = {
                        name: userDetail.profile.name.familyName + " " + userDetail.profile.name.givenName,
                        avatar: 'https://graph.facebook.com/'+userDetail.id+'/picture?width=100&height=100'
                      }
                      //  update to all item
                      $("#demoChatBody .mar-btm .media-"+position+ " img").each(function(){
                        $(this).attr("src", usersChat[position].avatar)
                      });
                      $("#demoChatBody .mar-btm .speech-"+position+ " .media-heading").each(function(){
                        $(this).html(usersChat[position].name);
                      })
                    }
                  }
                }).get();
              }else{
                //  update to all item
                $("#demoChatBody .mar-btm .media-"+position+ " img").each(function(){
                  $(this).attr("src", usersChat[position].avatar)
                });
                $("#demoChatBody .mar-btm .speech-"+position+ " .media-heading").each(function(){
                  $(this).html(usersChat[position].name);
                })
              }

              var chatItem = '<li class="mar-btm">'
                +'<div class="media-'+position+'"><img src="'+usersChat[position].avatar+'" alt="Profile Picture" class="img-circle img-sm"></div>'
                +'<div class="media-body pad-hor speech-'+position+'">'
                +'<div class="speech"><a href="#" class="media-heading">'+usersChat[position].name+'</a>'
                +'<p>'+response[j].text+'</p>'
                +'<p class="speech-time"><i class="fa fa-clock-o fa-fw"></i> '+currentTime+'</p>'
                +'</div>'
                +'</div>'
                +'</li>';

              $listBoxChat.append(chatItem)
            }
            $("#demoChatBody .nano-content").scrollTop(10000);
            //  update local chat data
            localChatData = response;
          }
        },
        complete: pollChat
      }).get();
    },1000)
  }

  $chatInput.keyup(function(event){
    var _this = $(this);
    if(event.which == 13){
      submitChat(_this.val());
      _this.val("");
    }
  });

  $("#submitChat").click(function(){
    submitChat($chatInput.val());
    $chatInput.val("")
  });

  function submitChat(message){
      var removeWhitespace = message.replace(/ /g,''),
      currentTime = new Date().toString("hh:mm tt");

    //  check empty
    if(removeWhitespace == ""){
      return false;
    }

    //  post api
    api(chatRequestUri,{
      data: JSON.stringify({from:userInfo.id, text: message}),
      success: function(response){
        //  scroll bottom
        $("#demoChatBody .nano-content").scrollTop(10000);
      }
    }).post()
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
