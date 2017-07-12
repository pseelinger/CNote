/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var token;
var database = firebase.database();
var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {



      this.receivedEvent('deviceready');
      //Facebook Login
      $('#fb-login').click(function(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);

        firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            token = result.credential.accessToken;
            // Redirect view to app home page
            window.location.href="index.html";
          }
          // The signed-in user info.
          var user = result.user;
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      });

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

      //Get access token for notifications
      window.FirebasePlugin.getToken(function(token) {
        // save this server-side and use it to push notifications to this device
        console.log(token);
        var user = firebase.auth().currentUser;
        writeUserData(user.uid, user.email, token);
      }, function(error) {
        console.error(error);
      });

      window.FirebasePlugin.onTokenRefresh(function(token) {
        // save this server-side and use it to push notifications to this device
        console.log(token);
      }, function(error) {
        console.error(error);
      });

      //Open the link embedded in the notification
      window.FirebasePlugin.onNotificationOpen(function(notification) {
        window.open(notification.link);
      }, function(error) {
        console.error(error);
      });
    }
  };

  function writeUserData(userId, name, token){
    firebase.database().ref('users/' + userId).set({
      username: name,
      accessToken: token
    });
  }

  app.initialize();
