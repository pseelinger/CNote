var user = firebase.auth().currentUser;

$("#notification-form").submit(function(){
  var newsPref = $("#news-pref").prop('checked');
  var sportsPref = $("#sports-pref").prop('checked');
  var obitsPref = $("#obits-pref").prop('checked');
  var classPref = $("#class-pref").prop('checked');
  writeUserPrefs(user.uid, newsPref, sportsPref, obitsPref, classPref);
  navigator.notification.alert("Preferences Saved!", goHome, "Preferences", "OK");
});

function writeUserPrefs(userId, newsPref, sportsPref, obitsPref, classPref){
  console.log(userId);
  var userPrefs = firebase.database().ref('users/' + userId);

  var prefs = {
    news: newsPref,
    sports: sportsPref,
    obituaries: obitsPref,
    classifieds: classPref
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
    obituaries: obitsPref,
    classifieds: classPref
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
