<<<<<<< HEAD
function getTheaters () {

    var zipcode = $('#zipcodeInput').text;
    var zipURL = "https://api.foursquare.com/v2/venues/search?client_id=HWEGQHCXDMLAMSA55FMIXBBOPPG3IWOE2APVKUVRLHB3GZVU&client_secret=0FDBXWBEBUAN5NDDZ2KZPE4UWLKPTVTB5PPMLPCEXHPSJKLN&v=20200801&categoryId=4bf58dd8d48988d17f941735&near=28560";    

    $.ajax({
        dataType: "json",
        url: zipURL,
        method: "Get",
        data: {},
            success: function( data ) {
                // Code for handling API response
                console.log(data);
                
                var venueData = data.response.venues;

                for (var i = 0; i < 3; i++) {

                    var theaterDiv = $('<div>');
                    var titleP = $('<p>');
                    var addressP = $('<p>');
                    var citySpan = $('<span>');
                    var stateSpan = $('<span>');
                    var zipSpan = $('<span>');

                    titleP.text(venueData[i].name);
                    addressP.text(venueData[i].location.address);
                    citySpan.text(venueData[i].location.city);
                    stateSpan.text(venueData[i].location.state);
                    zipSpan.text(venueData[i].location.postalCode);

                    theaterDiv.append(titleP, addressP, citySpan, stateSpan, zipSpan);
                    $('.col-md-8').append(theaterDiv);
            };
        
        },
            error: function(jqXHR, textStatus, errorThrown) {
            // Code for handling errors
        }
    });

};

getTheaters();
=======
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

getReview();
>>>>>>> d006728220c7ed6d1810ede8d8826fa10b432051
