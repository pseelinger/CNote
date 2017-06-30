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
                  }];

function getStories(url, divID){
  $.getJSON(url, function(result){
    var stories = result.posts;
    stories.forEach(function(story){
      $(divID).append("<a href='" + story.url  + "'>" +
      "<p class='story-title'>" + story.title_plain + "</p></a>" +
      "<div class='story-excerpt'>" + story.excerpt + "</div>");
    });
  });
}

//Hide and show tabs for categories
function switchTabs(showDiv, header){
  categories.forEach(function(cat){
    $(cat.contentID).hide();
    $(cat.id).css("color", "blue");
  });
  $(showDiv).show();
  $(header).css("color", "black");
}

//Prepare the categories for display
categories.forEach(function(cat){
  getStories(cat.url, cat.contentID);
  $(cat.contentID).hide();
  $(cat.id).css("color", "blue");
});

$("#all-content").show();
$("#all").css("color", "black");
