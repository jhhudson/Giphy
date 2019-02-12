$(document).ready(function () {
    
    var list = ["pizza", "burger", "fries", "hotdogs", "nachos"];


    

    var newCall = function () {
        
    
        $(".buttons").on("click", function () {

            // In this case, the "this" keyword refers to the button that was clicked
            var topic = $(this).attr("data-food");

            // Constructing a URL to search Giphy for the chosen topic   
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";            // Perfoming an AJAX GET request to our queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) { // After the data from the AJAX request comes back

                //Storing the data from ajax request in the result variable
                var result = response.data;
                console.log("RESULT: ", result);

                for (var i = 0; i < result.length; i++) {
                    
                    var resultDiv = $("<div>");

                    var rating = $("<p>").text("Rating: " + result[i].rating);
                    console.log(rating);

                    var topicImage = $("<img>");

                    topicImage.attr("id", i);

                    topicImage.addClass("recievedImgs");

                    topicImage.attr("src", result[i].images.fixed_height_still.url);

                    //Setting the data attribute for the image when it still and animated
                    topicImage.attr("data-still", result[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", result[i].images.fixed_height.url);

                    topicImage.attr("data-now", "still");

                    resultDiv.append(topicImage);
                    resultDiv.append(rating);

                    $("#images").append(resultDiv);


                }
            });
            $("#images").empty();
        });
    }
    function buttons() {

        $(".button-holders").empty();
        $("#images").empty();


        for (var i = 0; i < list.length; i++) {
            
            var button = $("<button>");

            button.attr("data-food", list[i]);

            button.addClass("buttons");

            button.text(list[i]);

            $(".button-holders").append(button);
        }
        newCall();
    }
    buttons();
    //Function for changing the still img to animated and opposite when click on image
    //Click event on dynamic content, that's why unusual syntax
    $("#images").on("click", ".recievedImgs", function () {

        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        //this referes to the image that was clicked
        var objImg = $(this).attr("data-now");
        console.log(objImg);
        //Checking if the image is still and switching for animate and opposite
        if (objImg === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-now", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-now", "still");

        }
    });
    // we are adding new buttons from the user input
    $("#add").on("click", function (event) {

        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // Grabbing the user input text from search box
        var newTopic = $(".form-control").val();

        for (var i = 0; i < list.length; i++) {
            if (newTopic.toLowerCase() == list[i].toLowerCase()) {
                alert("Topic " + newTopic + " already exists.");
                return;
            }
        }

        // The new topic theme added to our array
        list.push(newTopic.toLowerCase());

        // Calling our topicButtons funcion to creatr new button
        buttons();
    });
})