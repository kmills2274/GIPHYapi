// Global Vars
var topics = ["Hello Kitty", "Chocolate", "Mean Girls","Dolly Parton","Brendon Urie","Ice Cream","Summer Time","Louis Vuitton","Miranda Lambert",
"Cats","Glitter", "Diamonds","Aerial Fitness","Harry Potter","Rap Music","Breakfast At Tiffany's","Ballet","Vampire Diaries","Coffee"];
var numGifs = 10;
var offset = 0;

// Render buttons function
createButtons();

// On click event (applies to all elements with a class of "topics")
$(document).on("click", ".topics", function() {

    // Clear displayed gifs when new topics is selected & reset offset to "0"
    $("#displayGif").empty(); 
    offset = 0;  
    displayGifInfo($(this).attr("data-type"))
});

// On click event (applies to all elemements with a class of "#gifImage")
$(document).on("click",".gifImage", gifAnimation);

// On click event (when the #addGif button is clicked)
$("#addGif").on("click", function(event) {
    event.preventDefault();

    // Gets the user input from #gifInput text box
    var newTopic = $("#gifInput").val().trim();

    // Add button IF text field is not blank
    if (newTopic != "") {

        // The gif topic from the user imput get added to gif array
        topics.push(newTopic);

        // Call createButtons function 
        createButtons();

        // Clear user input box
        $("#gifInput").val("");
    }

});  

// On click event (when the #moreGifs button is clicked)
$("#moreGifs").on("click", function(event) {
    event.preventDefault();
    offset += 10;
    displayGifInfo($(this).attr("data-type"));
});

// Function to display the correct topic content on HTML
function displayGifInfo(topics) {

    // var topics = $(this).attr("data-topics");
    console.log("offset: " + offset)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topics+"&limit=10&offset="+offset+"&rating=G&lang=en&api_key=RsxhfLTZUKXv0fC9G537lzpjDi680XJ7"

    // AJAX call for the gif topic button that is clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < numGifs; i++){

            var gifDiv = $("<div class='card my-2'>");
            var div = $("<div class='card-body'>").html("<h5 class='card-title'>" + response.data[i].title.toUpperCase() + '</h5>');
            var ul = $("<ul class='list-group list-group-flush'>");
            var gifImage = $("<img class='card-img-top gifImage hover-outline' alt=" + topics + ">");
            gifImage.attr("src",response.data[i].images.fixed_height_small_still.url);
            gifImage.attr("still",response.data[i].images.fixed_height_small_still.url)
            gifImage.attr("gif",response.data[i].images.fixed_height_small.url);
            gifDiv.append(ul);
            ul.append("<li class='list-group-item'><strong>Source:</strong> " + response.data[i].source_tld + "<br/>")
            div.append("<h6>Rating: " + response.data[i].rating.toUpperCase() + "</h6>")
            gifDiv.prepend(div);
            gifDiv.prepend(gifImage);
            console.log(gifDiv)
            $("#displayGif").prepend(gifDiv);
        }
        
        // Add current topic to #moreGifs button
        $("#moreGifs").show().attr("data-type",topics);
    });
}

// Call createButtons function 
function createButtons() {

    // Clear current buttons to prevent button duplication when creating
    $("#gifButtons").empty();
    $("#moreGifs").hide();

    // Loops through the array of gif topics
    for (var i = 0; i < topics.length; i++) {

        // Dynamicaly create buttons for each gif topic in the array
        var a = $("<button>");

        // Add "topics" class to button
        a.addClass("topics btn btn-dark btn-outline-light m-1");

        // Add a data attribute
        a.attr("data-type", topics[i]);

        // Display initial button text
        a.text(topics[i]);

        // Append the button to the #gifButtons div
        $("#gifButtons").append(a);
    }   
}

// Function to toggle between still image and gif
function gifAnimation () {

    if ($(this).attr("src") === $(this).attr("still")) {
    $(this).attr("src",$(this).attr("gif"));
    }

    else {
    $(this).attr("src",$(this).attr("still"));
    }
}
