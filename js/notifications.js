var user = firebase.auth().currentUser;

$("#notification-form").submit(function(){
  var newsPref = $("#news-pref").prop('checked');
  var sportsPref = $("#sports-pref").prop('checked');
  var eventsPref = $("#events-pref").prop('checked');
  writeUserPrefs(user.uid, newsPref, sportsPref, eventsPref);
  navigator.notification.alert("Preferences Saved!", goHome, "Preferences", "OK");
});

function writeUserPrefs(userId, newsPref, sportsPref, eventsPref){
  console.log(userId);
  var userPrefs = firebase.database().ref('users/' + userId);

  var prefs = {
    News: newsPref,
    Sports: sportsPref,
    Events: eventsPref
  };

  for(property in prefs){
    if(prefs[property] == true){
      window.FirebasePlugin.subscribe(property);
    }else{
      window.FirebasePlugin.unsubscribe(property);
    }
  }

  userPrefs.child('notifications').set({
    news: newsPref,
    sports: sportsPref,
    events: eventsPref,
  });

}

function goHome(){
  window.location.href="index.html";
}

$("#sign-out").on('click', function(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href="login.html";
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
});
