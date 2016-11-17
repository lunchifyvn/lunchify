import store from '../store';
import $ from 'jquery';


export function checkLogin() {
  return;
}

export function login() {
  console.log("call login api");
  $.ajax({
    url: "http://localhost:3000/auth/facebook",
    beforeSend: function(){

    },
    success: function(response){
      console.log(response);
    }
  });
  return;
}

export function hasFollow() {
  return;
}

export function getMatching() {
  return;
}

export function follow(userId) {
  return;
}

export function updateProfile() {
  return;
}

export function viewUserDetail(userId) {
  return;
}

export function sendInvite(userId) {
  return;
}

export function receiveInvitation() {
  return;
}

export function rejectInvitation() {
  return;
}

export function sendChat(userID, message) {
  return;
}

export function receiveChat() {
  return;
}
