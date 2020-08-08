$(document).ready(function() {

    //GLOBAL VARIABLES
    var movieTitle = "";
    var zipcode = "";
    var historyArr = [
        {
            title: "",
            zip: ""
        },
    ];
    
    $("#welcome-search-button").on("click", function() {

        movieTitle = $("#welcomeTitleInput").val();
        zipcode = $('#welcomeZipcodeInput').val();
        getTheaters (zipcode);
        getReview (movieTitle);
        getMovieData (movieTitle);
        storeHistory();

        $(".welcomeJumbo").attr("style", "display: none;")
        $(".mainArticle").attr("style", "display: block;")
    })


    recallHistory();


    $("#search-button").on("click", function () {
        movieTitle = $("#movieTitleInput").val();
        zipcode = $('#zipcodeInput').val();
        getTheaters (zipcode);
        getReview (movieTitle);
        getMovieData (movieTitle);
        storeHistory();
    });


    function getTheaters (zipcode) {
        var zipURL = "https://api.foursquare.com/v2/venues/search?client_id=HWEGQHCXDMLAMSA55FMIXBBOPPG3IWOE2APVKUVRLHB3GZVU&client_secret=0FDBXWBEBUAN5NDDZ2KZPE4UWLKPTVTB5PPMLPCEXHPSJKLN&v=20200801&categoryId=4bf58dd8d48988d17f941735&near=" + zipcode;    
        $.ajax({
            dataType: "json",
            url: zipURL,
            method: "Get",
            data: {},
                success: function( data ) {
                    // Code for handling API response
                    // console.log(zipcode);
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


    function getReview (movieTitle) {
        var finalMovieTitle = movieTitle.replace(" ", "+");
        var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + finalMovieTitle + "&api-key=fcbAXVUQU4auE0F0Q4KVCPAWLHAZWgnG";
    $.ajax({
        url: reviewURL,
        method: "GET"
    }).then(function(response) {
        $("#reviewLink").attr("href", response.results[0].link.url);
        });
    };


    function getMovieData (movieTitle) {
        var finalMovieTitle = movieTitle.replace(" ", "%20");
        var movieInfoURL = "https://api.themoviedb.org/3/search/movie?api_key=6b83e95fa4b5d9e49e41bdddbf21e20e&language=en-US&query=" + finalMovieTitle + "&page=1&include_adult=false";
        // console.log();
        $.ajax({
            url: movieInfoURL,
            method: "GET",
        }).then(function(response){
            console.log(response.results[0]); //make sure it pulls one best matched/most popular result
            var moviePosterImgURL = "https://image.tmdb.org/t/p/w342" + response.results[0].poster_path;
            $("#poster").attr("src", moviePosterImgURL);
            $("#movieTitleHeader").text(response.results[0].original_title);
            $("#movieYear").text(response.results[0].release_date);
            $("#movieDes").text(response.results[0].overview);
        });
    };

    function makeRow (obj) {
        var listItem = $("<li>").attr("class", "btn list-group-item list-group-item-action");
        listItem.text(obj.title + " - " + obj.zip);
        $("#historyList").prepend(listItem);
    };


    function storeHistory () {

        var tempObj = {
            title: movieTitle,
            zip: zipcode
        };

        if(historyArr.indexOf(tempObj) === -1) {
            historyArr.push(tempObj);

            localStorage.setItem("history", JSON.stringify(historyArr));

            makeRow(tempObj);
        }
        
    };


    function recallHistory () {
        historyArr = JSON.parse(localStorage.getItem("history")) || [];

        for (var i = 0; i < historyArr.length; i++) {
            makeRow(historyArr[i]);
        }

    };

    $("#historyList").on("click", "li", function() {
        var listString = $(this).text();
        var splitString = listString.split(" - ")

        getMovieData(splitString[0]);
        getReview(splitString[0]);
        getTheaters(splitString[1]);

    });

});

