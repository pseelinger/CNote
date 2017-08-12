//Generates the content for each of the stories tabs

//If the project is set up as outlined in the README, just replace <YOUR URL> with your site's URL
//You can also change out the categories if you want by changing the slug variable in the url field,
//just remember to rename the footer navigation buttons appropriately, as well as your notification options

var categories = [{
  "url": "https://<YOUR URL>/?json=get_recent_posts",
  "id": "#all",
  "contentID": "#all-content"
},
{
  "url": "https://<YOUR URL>/?category_slug=news&json=get_category_posts",
  "id": "#news",
  "contentID": "#news-content"
},
{
  "url": "https://<YOUR URL>/?category_slug=sports&json=get_category_posts",
  "id": "#sports",
  "contentID": "#sports-content"
},
{
  "url": "https://<YOUR URL>/?category_slug=events&json=get_category_posts",
  "id": "#events",
  "contentID": "#events-content"
}];


function getStories(url, divID){
  $.getJSON(url, function(result){
    var stories = result.posts;
    stories.forEach(function(story){
      if(story.thumbnail == null){
        $(divID).append("<div class='story'><h4>" + story.categories[0]['title'] + "</h4><a class='story-title' href='" + story.url  + "'>" +
        "<p>" + story.title_plain + "</p></a>" +
        "<div class='story-excerpt'>" + story.excerpt + "</div>" +
        "<a class='read-more' href='" +story.url+"'>Read More >></a></div>"
      );
      }else{
        $(divID).append("<div class='story'><h4>" + story.categories[0]['title'] + "</h4><a class='story-title' href='" + story.url  + "'>" +
        "<p>" + story.title_plain + "</p></a>" +
        "<img src='" + story.thumbnail + "' class='story-img' />" +
        "<div class='story-excerpt'>" + story.excerpt + "</div>" +
        "<a class='read-more' href='" +story.url+"'>Read More >></a></div>");
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
