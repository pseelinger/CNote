 # CNote

 Mobile notification app for small news organizations

 ## Use
 CNote is a blank slate app for small news organizations to use as a notification service and basic app for their sites. The app takes a JSON feed and populates sections of the app with stories from that feed. While technically it could take any feed with a little modification, CNote is specifically set up to use the [JSON API](https://wordpress.org/plugins/json-api) plugin for WordPress. It also uses [Firebase](https://firebase.google.com) for the backend, which has its own notification system set up already. More details on a custom notification backend for CNote to come.

 ## Deployment

 1. Clone this repo
 2. `cordova add platform <platform>` for each platform you need
 3. Link your app up with a firebase project and a Facebook app (more to come)
 4. Change out URLs, API keys and such (more to come on this when the project is closer to complete)
 5. `cordova build` or `cordova build <platform>`
 6. `cordova run <platform>`

 ## Contact
 Patrick Seelinger - patseelinger@gmail.com

 This README is incomplete at the moment since the project is still under development. 
