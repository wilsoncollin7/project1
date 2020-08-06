function getTheaters () {

    var zipcode = $('#zipcodeInput').val();
    var zipURL = "https://api.foursquare.com/v2/venues/search?client_id=HWEGQHCXDMLAMSA55FMIXBBOPPG3IWOE2APVKUVRLHB3GZVU&client_secret=0FDBXWBEBUAN5NDDZ2KZPE4UWLKPTVTB5PPMLPCEXHPSJKLN&v=20200801&categoryId=4bf58dd8d48988d17f941735&near=" + zipcode;    

    $.ajax({
        dataType: "json",
        url: zipURL,
        method: "Get",
        data: {},
            success: function( data ) {
                // Code for handling API response
                console.log(zipcode);

                $('#theaterList').empty();
                
                var venueData = data.response.venues;

                for (var i = 0; i < 5; i++) {

                    var venueString = "";

                    if (venueData[i].name) {
                        venueString += venueData[i].name;
                    }

                    if (venueData[i].location.address) {
                        venueString += ", " + venueData[i].location.address;
                    }

                    if (venueData[i].location.city) {
                        venueString += ", " + venueData[i].location.city;
                    }

                    if (venueData[i].location.state) {
                        venueString += ", " + venueData[i].location.state;
                    }

                    if (venueData[i].location.postalCode) {
                        venueString += ", " + venueData[i].location.postalCode;
                    }

                    var noCommas = venueString.replace(",", "");
                    var searchString = noCommas.replace(" ", "+");
                    var mapSearchURL = "https://google.com/maps/search/" + searchString;
                    
                    var li = $('<li>').addClass('list-group-item');
                    var a = $('<a>').attr('target', '_blank');

                    a.attr('href', mapSearchURL);
                    a.text(venueString);

                    li.append(a);

                    $('#theaterList').append(li);
            };
        
        },
            error: function(jqXHR, textStatus, errorThrown) {
            // Code for handling errors
        }
    });

};


// var movieTitle = ""; //grabbed from id: #movieTitleInput
// var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieTitle + "&api-key=fcbAXVUQU4auE0F0Q4KVCPAWLHAZWgnG";

var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=the+little+mermaid&api-key=fcbAXVUQU4auE0F0Q4KVCPAWLHAZWgnG";

function getReview () {
   $.ajax({
   url: reviewURL,
   method: "GET"
 }).then(function(response) {
   console.log(response);

   var reviewDiv = $("<div>");
   var reviewP = $("<p>");
   var reviewLink = $("<a>").attr("href", response.results[0].link.url).attr("target", "_blank").text("Click Here for NYTimes Movie Review");

   reviewP.append(reviewLink);
   reviewDiv.append(reviewP);
   $(".col-md-8").append(reviewDiv);
 });
};

$('#search-button').on('click', getTheaters);