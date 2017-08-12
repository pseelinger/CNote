var user = firebase.auth().currentUser;
var userId = user.uid;

var passClicks = 0;
var emailClicks = 0;

  $('#profile-email').html(user.email);
  $('#reset-email').on('click', function(){
    if(emailClicks == 0){
      $('#email-input').css('display', 'inline-block');
      $('#reset-email').text("Submit");
      emailClicks = 1;
    }else{
      var emailChange = $('#email-input').value;
      writeProp('email', emailChange);
      emailClicks = 0;
    }
  });

$('#reset-password').on('click', function(){
  if(passClicks = 0){
  $('#password-input').css('display', 'inline-block');
  }else{
    var passChange = $('#password-input').value;
  }
});

function writeProp(prop, change){
  firebase.database().ref('users/' + userId).update({
    prop: change,
  });
}

$('.home-button').click(function() {
  window.location.href="index.html";
});
