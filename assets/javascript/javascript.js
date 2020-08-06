function getTheaters () {
    console.log("working 2")
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

// getTheaters();

$("#search-button").on("click", getReview);

// var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=the+little+mermaid&api-key=fcbAXVUQU4auE0F0Q4KVCPAWLHAZWgnG";

function getReview () {
    var movieTitle = $("#movieTitleInput").val(); //grabbed from id: #movieTitleInput
    var finalMovieTitle = movieTitle.replace(" ", "+");

    var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + finalMovieTitle + "&api-key=fcbAXVUQU4auE0F0Q4KVCPAWLHAZWgnG";
    
$.ajax({
    url: reviewURL,
    method: "GET"
 }).then(function(response) {
   console.log(reviewURL);

   var reviewDiv = $("<div>");
   var reviewP = $("<p>");
   var reviewLink = $("<a>").attr("href", response.results[0].link.url).attr("target", "_blank").text("Click Here for NYTimes Movie Review");

   reviewP.append(reviewLink);
   reviewDiv.append(reviewP);
   $("#reviewList").append(reviewDiv);
 });
};

// getReview();

$("#search-button").on("click", getMovieData);

function getMovieData (data) {
    var movieTitle = $("#movieTitleInput").val(); //grabbed from id: #movieTitleInput
    var finalMovieTitle = movieTitle.replace(" ", "%20");

    var movieInfoURL = "https://api.themoviedb.org/3/search/movie?api_key=6b83e95fa4b5d9e49e41bdddbf21e20e&language=en-US&query=" + finalMovieTitle + "&page=1&include_adult=false";

    console.log(data);

    

    $.ajax({
        url: movieInfoURL,
        method: "GET",
    }).then(function(response){
        console.log(response.results[0]); //make sure it pulls one best matched/most popular result

        var movieInfoDiv = $("<div>"); //do we need a new div since we are only replacing text and img?
        var moviePlotP = $("<p>");
        var movieYearP = $("<p>");
        var movieActorsP = $("<p>");

        var moviePosterImgURL = response.poster_path;
        var moviePosterImg = $("<img>").attr("src", moviePosterImgURL);
        

        moviePlotP.text(response.results[0].overview);
        movieYearP.text(response.results[0].release_date);
        // movieActorsP.text(response.results[0].); May need sep. AJAX request for actors
        
        movieInfoDiv.append(moviePosterImg);
        movieInfoDiv.append(moviePlotP);
        movieInfoDiv.append(movieYearP);

    });

    

}