//Generates the content for each of the stories tabs

var categories = [{
  "url": "<JSON URL>",
  "id": "#all",
  "contentID": "#all-content"
},
{
  "url": "<JSON URL>",
  "id": "#news",
  "contentID": "#news-content"
},
{
  "url": "<JSON URL>",
  "id": "#sports",
  "contentID": "#sports-content"
},
{
  "url": "<JSON URL>",
  "id": "#obituaries",
  "contentID": "#obituaries-content"
},
{
  "url": "<JSON URL>",
  "id": "#classifieds",
  "contentID": "#classifieds-content"
}];

function getStories(url, divID){
  $.getJSON(url, function(result){
    var stories = result.posts;
    stories.forEach(function(story){
      if(story.thumbnail == null){
        $(divID).append("<a class='story-title' href='" + story.url  + "'>" +
        "<p>" + story.title_plain + "</p></a>" +
        "<div class='story-excerpt'>" + story.excerpt + "</div>");
      }else{
        $(divID).append("<a class='story-title' href='" + story.url  + "'>" +
        "<p>" + story.title_plain + "</p></a>" +
        "<img src='" + story.thumbnail + "' class='story-img' />" +
        "<div class='story-excerpt'>" + story.excerpt + "</div>");
      }
    });
  });
}


//Prepare the categories for display
categories.forEach(function(cat){
  getStories(cat.url, cat.contentID);
});

$("#sign-out").on('click', function(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href="login.html";
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
});
