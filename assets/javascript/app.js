$(document).ready(function() {
  var topics = [
    "tom waits",
    "marilyn monroe",
    "harrison ford",
    "barack obama",
    "donald trump"
  ];

  function populateButtons(arrayToUse, classToAdd, area) {
    $(area).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-search", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(area).append(a);
    }
  }


  $(document).on("click", ".topic-button", function() {
    $("#topics").empty();
    $(".topic-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");

    var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=sbbziNZZfZ1PUoZJwiMwDExMeddu7VIN&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0;i < results.length; i++) {
          var topicDiv = $("<div class=\"topic-item\">");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var topicImage = $("<img>");
          topicImage.attr("src", still);
          topicImage.attr("data-still", still);
          topicImage.attr("data-animate", animated);
          topicImage.attr("data-state", "still");
          topicImage.addClass("topic-image");
​
          topicDiv.append(p);
          topicDiv.append(topicImage);
          
          $("#topics").append(topicDiv);
​        }
    });
});

$(document).on("click", ".topic-image", function() {
  ​
      var state = $(this).attr("data-state");
  ​
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});
  ​
$("#add-topic").on("click", function(event) {

      event.preventDefault();
      var newTopic = $("input").eq(0).val();
  ​
      if (newTopic.length > 2) {
        topics.push(newTopic);
      }
  ​
      populateButtons(topics, "topic-button", "#topic-buttons");
  ​
    });
  ​
  populateButtons(topics, "topic-button", "#topic-buttons");
});


