$(document).ready(function () {
  // Array of pastimes
  var pastimes = ["Snowboarding", "Mountain Biking", "Jogging", "Basketball", "Coding", "Movies", "Automobiles"];

  function displaypastimeInfo() {

    var giph = $(this).attr("data-name");
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=${giph}&api_key=QC82WsJij7Ccw1xEg1nVVTADqTuM2g8S&limit=10&rating=g`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      let rating;
      let url;
      // let image;
      renderButtons();
      $('.clear').empty()
      for (let i = 0; i < response.data.length; i++) {
        let giphImg = $("<img>");
        rating = response.data[i].rating;
        url = response.data[i].images.fixed_height_still.url;
        giphImg.attr({ src: response.data[i].images.fixed_height_still.url, "data_still": response.data[i].images.fixed_height_still.url, "data_animate": response.data[i].images.fixed_height.url, "data_state": "still" });
        giphImg.addClass("gif");
        $('#pastimes-image').append(giphImg);
        $('#pastimes-image').append("<p>Rating: " + rating + "</p>");
      }
    });
  }

  $(document.body).on("click", ".gif", function () {
    var state = $(this).attr("data_state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data_animate"));
      $(this).attr("data_state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data_still"));
      $(this).attr("data_state", "still");
    }
  });

  // Function for displaying pastime data
  function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < pastimes.length; i++) {

      var a = $("<button>");
      a.addClass("pastime");
      a.attr("data-name", pastimes[i]);
      a.text(pastimes[i]);
      $("#buttons-view").append(a);
    }
  }

  $("#add-pastime").on("click", function (event) {
    event.preventDefault();

    var pastime = $("#pastime-input").val().trim();

    pastimes.push(pastime);

    renderButtons();
  });

  $(document).on("click", ".pastime", displaypastimeInfo);

  renderButtons();
})