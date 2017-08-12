var user = firebase.auth().currentUser;

var userPrefs = firebase.database().ref('users/' + user.uid);
userPrefs.once('value').then(function(snapshot) {
  var notificationPrefs = snapshot.child('notifications').val();

  if (notificationPrefs.news == true) { $('#news-pref').val('on').slider("refresh"); }
  if (notificationPrefs.sports == true) { $("#sports-pref").val('on').slider("refresh"); }
  if (notificationPrefs.events == true) { $("#events-pref").val('on').slider("refresh"); }
}).catch(function(error) {
  console.log(error.message);
});



$("#notification-form").submit(function(){
  var newsPref;
  var sportsPref;
  var eventsPref;
  if ($("#news-pref").val() == "on") { newsPref = true; } else { newsPref = false; }
  if ( $("#sports-pref").val() == "on") { sportsPref = true; } else { sportsPref = false; }
  if ($("#events-pref").val() == "on") {eventsPref = true; } else { eventsPref = false; }
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

  console.log(prefs);

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
