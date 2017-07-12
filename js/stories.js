//Generates the content for each of the stories tabs

var categories = [{
  "url": "https://nrcolumbus.com/?json=get_recent_posts",
  "id": "#all",
  "contentID": "#all-content"
},
{
  "url": "https://nrcolumbus.com/?category_slug=news&json=get_category_posts",
  "id": "#news",
  "contentID": "#news-content"
},
{
  "url": "https://nrcolumbus.com/?category_slug=sports&json=get_category_posts",
  "id": "#sports",
  "contentID": "#sports-content"
},
{
  "url": "https://nrcolumbus.com/?category_slug=obituaries&json=get_category_posts",
  "id": "#obituaries",
  "contentID": "#obituaries-content"
},
{
  "url": "https://nrcolumbus.com/?category_slug=classifieds&json=get_category_posts",
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

//Hide and show tabs for categories
// function switchTabs(showDiv, header){
//   categories.forEach(function(cat){
//     $(cat.contentID).hide();
//     $(cat.id).css("color", "blue");
//   });
//   $(showDiv).show();
//   $(header).css("color", "black");
// }

//Prepare the categories for display
categories.forEach(function(cat){
  getStories(cat.url, cat.contentID);
  // $(cat.contentID).hide();
  // $(cat.id).css("color", "blue");
});

$("#sign-out").on('click', function(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href="login.html";
  }).catch(function(error) {
    // An error happened.
  });
});

// $("#all-content").show();
// $("#all").css("color", "black");
