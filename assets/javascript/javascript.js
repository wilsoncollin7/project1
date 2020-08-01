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